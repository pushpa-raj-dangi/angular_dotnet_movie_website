using System.Threading.Tasks;
using backend.Filters;
using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    public class GenresController : BaseApiController
    {
        private readonly IRepository _repository;

        public GenresController(IRepository repository)
        {
            _repository = repository;

        }

        [HttpGet]
        [ServiceFilter(typeof(CustomFilter))]
        public async Task<ActionResult<Genre>> Genres()
        {
            return Ok(await _repository.Genres());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Genre>> Genre(int id)
        {
            return Ok(await _repository.Genre(id));
        }


        [HttpPost]
        public async Task<ActionResult> Post(Genre genre)
        {
            await Task.Delay(1);
            return Ok("ok");
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