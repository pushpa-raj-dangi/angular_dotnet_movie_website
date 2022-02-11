using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.DTOs.Actor;
using backend.DTOs.Genre;
using backend.DTOs.Movie;
using backend.DTOs.Theater;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class MoviesController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly IStorageService _fileService;
        private readonly string containerName = "actors";

        public MoviesController(StoreContext context, IMapper mapper, IStorageService fileService)
        {
            _fileService = fileService;
            _mapper = mapper;
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<List<ActorDto>>> Actors([FromQuery] PaginationDto paginationDto)
        {

            var queryable = _context.Actors.AsQueryable();

            await HttpContext.InsertParameterPaginatinInHeader(queryable);

            var actors = await queryable.OrderBy(actors => actors.Name).Paginate(paginationDto).ToListAsync();
            return Ok(_mapper.Map<List<ActorDto>>(actors));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ActorDto>> Actor(int id)
        {
            var actor = await _context.Actors.FindAsync(id);
            if (actor == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<ActorDto>(actor));
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromForm] MovieCreateDto movieCreateDto)
        {
            var movie = _mapper.Map<Movie>(movieCreateDto);

            if (movieCreateDto.Poster != null)
            {
                movie.Poster = await _fileService.SaveFile(containerName, movieCreateDto.Poster);
            }
            AnnotateActorOrder(movie);
            await _context.AddAsync(movie);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromForm] MovieCreateDto movieCreateDto)
        {
            var result = await _context.Actors.FindAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            result = _mapper.Map(movieCreateDto, result);

            if (movieCreateDto.Poster != null)
            {
                result.Picture = await _fileService.EditFile(containerName, movieCreateDto.Poster, result.Picture);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpGet("PostGet")]
        public async Task<ActionResult<MoviePostGetDto>> GetPost()
        {
            var theaters = await _context.Theaters.OrderBy(x => x.Name).ToListAsync();

            var genres = await _context.Genres.OrderBy(x => x.Name).ToListAsync();

            var theatersDto = _mapper.Map<List<TheaterDto>>(theaters);
            var gernesDto = _mapper.Map<List<GenreDto>>(genres);

            return new MoviePostGetDto { Genres = gernesDto, Theaters = theatersDto };
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actor = await _context.Actors.FindAsync(id);
            if (actor == null)
            {
                return NotFound();
            }
            await _fileService.DeleteFile(actor.Picture, containerName);
            _context.Remove(actor);
            await _context.SaveChangesAsync();
            return Ok(200);
        }

        private void AnnotateActorOrder(Movie movie)
        {
            if (movie.MoviesActors != null)
            {
                for (int i = 0; i < movie.MoviesActors.Count; i++)
                {
                    movie.MoviesActors[i].Order = i;
                }
            }
        }
    }
}