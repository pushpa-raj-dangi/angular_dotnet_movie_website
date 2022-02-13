using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs;
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
        public async Task<ActionResult<HomeDto>> Get()
        {

            var top = 6;
            var today = DateTime.Today;
            var upcomings = await _context
            .Movies.Where(x => x.ReleaseDate > today)
            .OrderBy(x => x.ReleaseDate)
            .Take(top)
            .ToListAsync();

            var inTheaters = await _context.Movies.Where(x => x.InTheater)
            .OrderBy(x => x.ReleaseDate)
            .Take(top)
            .ToListAsync();
            var homeDto = new HomeDto
            {
                Upcomings = _mapper.Map<List<MovieDto>>(upcomings),
                InTheaters = _mapper.Map<List<MovieDto>>(inTheaters)
            };

            return Ok(homeDto);


        }

        [HttpGet("filter")]
        public async Task<ActionResult<List<MovieDto>>> Filter([FromQuery] MovieFilterDto filterDto)
        {
            var queryable = _context.Movies.AsQueryable();

            if (queryable == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(filterDto.Name))
            {
                queryable = queryable.Where(x => x.Name.Contains(filterDto.Name));
            }

            if (filterDto.Upcomings)
            {
                queryable = queryable.Where(x => x.ReleaseDate > DateTime.Today);
            }

            if (filterDto.InTheaters)
            {
                queryable = queryable.Where(x => x.InTheater);
            }

            if (filterDto.GenreId != 0)
            {
                queryable = queryable.Where(x => x.MoviesGenres.Select(y => y.GenreId).Contains(filterDto.GenreId));
            }


            await HttpContext.InsertParameterPaginatinInHeader(queryable);
            var movies = await queryable.OrderBy(x => x.Name).Paginate(filterDto.PaginationDto).ToListAsync();

            return Ok(_mapper.Map<List<MovieDto>>(movies));
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<MovieDto>> GetMovie(int id)
        {
            var movie = await _context.Movies.Include(x => x.MoviesGenres).ThenInclude(x => x.Genre)
            .Include(x => x.MoviesTheaters).ThenInclude(x => x.Theater).Include(x => x.MoviesActors).ThenInclude(x => x.Actor)
            .FirstOrDefaultAsync(x => x.Id == id);
            if (movie == null)
            {
                return NotFound();
            }
            var dto = _mapper.Map<MovieDto>(movie);
            dto.Actors = dto.Actors.OrderBy(x => x.Order).ToList();

            return Ok(dto);
        }



        [HttpGet("putget/{id:int}")]
        public async Task<ActionResult<MoviePutGetDto>> PutMovieGet(int id)
        {
            var movies = await GetMovie(id);

            if (movies.Result is NotFoundResult)
            {
                return NotFound();
            }

            var movie = movies.Value;
            var genresSelectedIds = movie.Genres.Select(x => x.Id).ToList();
            var nonSelectedGenres = await _context.Genres.Where(x => !genresSelectedIds.Contains(x.Id))
                .ToListAsync();

            var movieTheatersIds = movie.Theaters.Select(x => x.Id).ToList();
            var nonSelectedMovieTheaters = await _context.Theaters.Where(x =>
            !movieTheatersIds.Contains(x.Id)).ToListAsync();

            var nonSelectedGenresDTOs = _mapper.Map<List<GenreDto>>(nonSelectedGenres);
            var nonSelectedMovieTheatersDTO = _mapper.Map<List<TheaterDto>>(nonSelectedMovieTheaters);

            var response = new MoviePutGetDto
            {
                Movie = movie,
                SelectedGenres = movie.Genres,
                NonSelectedGenres = nonSelectedGenresDTOs,
                NonSelectedTheaters = nonSelectedMovieTheatersDTO,
                Actors = movie.Actors
            };

            return response;

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
            var movie = await _context.Movies.Include(x => x.MoviesActors)
            .Include(x => x.MoviesGenres).Include(x => x.MoviesTheaters)
            .FirstOrDefaultAsync(x => x.Id == id);

            if (movie == null)
            {
                return NotFound();
            }
            movie = _mapper.Map(movieCreateDto, movie);
            if (movieCreateDto.Poster != null)
            {
                movie.Poster = await _fileService.EditFile(containerName, movieCreateDto.Poster, movie.Poster);

            }

            AnnotateActorOrder(movie);
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
            var movie = await _context.Movies.FindAsync(id);
            if (movie == null)
            {
                return NotFound();
            }
            _context.Remove(movie);
            await _context.SaveChangesAsync();
            await _fileService.DeleteFile(movie.Poster, containerName);
            return Ok(200);
        }

        private static void AnnotateActorOrder(Movie movie)
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