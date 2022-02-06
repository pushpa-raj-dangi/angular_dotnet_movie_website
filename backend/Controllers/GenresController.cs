using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Filters;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class GenresController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public GenresController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        [HttpGet]
        [ServiceFilter(typeof(CustomFilter))]
        public async Task<ActionResult<GenreDto>> Genres()
        {

            var genres = await _context.Genres.OrderBy(genres => genres.Name).ToListAsync();
            return Ok(_mapper.Map<List<GenreDto>>(genres));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GenreDto>> Genre(int id)
        {
            var genre = await _context.Genres.FindAsync(id);
            if (genre == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<GenreDto>(genre));
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreateDto genreCreateDto)
        {
            var genre = _mapper.Map<Genre>(genreCreateDto);
            var genreInDb = await _context.Genres.SingleOrDefaultAsync(x => x.Name.Equals(genre.Name));
            if (genre.Name.ToUpper().Equals(genreInDb.Name.ToUpper()))
                return BadRequest("Genre already exist.");

            await _context.AddAsync(genre);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] GenreCreateDto genreCreateDto)
        {
            var genre = _mapper.Map<Genre>(genreCreateDto);
            genre.Id = id;
            _context.Entry(genre).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var genre = await _context.Genres.FindAsync(id);
            if (genre == null)
            {
                return NotFound();
            }
            _context.Remove(genre);
            await _context.SaveChangesAsync();
            return Ok(200);
        }
    }
}