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
        private readonly IRepository _repository;
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public GenresController(IRepository repository, StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _repository = repository;

        }

        [HttpGet]
        [ServiceFilter(typeof(CustomFilter))]

        public async Task<ActionResult<GenreDto>> Genres()
        {

            var genres = await _context.Genres.OrderBy(genres => genres.Name).ToListAsync();
            return Ok(_mapper.Map<List<GenreDto>>(genres));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Genre>> Genre(int id)
        {
            return Ok(await _repository.Genre(id));
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] GenreCreateDto genreCreateDto)
        {
            var genre = _mapper.Map<Genre>(genreCreateDto);
            await _context.AddAsync(genre);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult> Put(Genre genre)
        {
            await Task.Delay(1);
            return Ok("ok");
        }

        [HttpDelete]
        public async Task<ActionResult> Delete(Genre genre)
        {
            await Task.Delay(1);
            return Ok("ok");
        }
    }
}