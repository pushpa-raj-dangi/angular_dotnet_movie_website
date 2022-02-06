using System.Threading.Tasks;
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

        public GenresController(IRepository repository, StoreContext context)
        {
            _context = context;
            _repository = repository;

        }

        [HttpGet]
        [ServiceFilter(typeof(CustomFilter))]
        public async Task<ActionResult<GenreDto>> Genres()
        {
            return Ok(await _context.Genres.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Genre>> Genre(int id)
        {
            return Ok(await _repository.Genre(id));
        }


        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Genre genre)
        {
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