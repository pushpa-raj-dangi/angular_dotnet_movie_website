using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class ActorsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;

        public ActorsController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }

        [HttpGet]
        public async Task<ActionResult<ActorDto>> Actors()
        {

            var actors = await _context.Actors.OrderBy(actors => actors.Name).ToListAsync();
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
        public async Task<ActionResult> Post([FromBody] ActorCreateDto actorCreateDto)
        {
            var actor = _mapper.Map<Actor>(actorCreateDto);
            var actorInDb = await _context.Genres.SingleOrDefaultAsync(x => x.Name.Equals(actor.Name));
            if (actor.Name.ToUpper().Equals(actorInDb.Name.ToUpper()))
                return BadRequest("Actor already exist.");

            await _context.AddAsync(actor);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] ActorCreateDto actorCreateDto)
        {
            var actor = _mapper.Map<Actor>(actorCreateDto);
            actor.Id = id;
            _context.Entry(actor).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var actors = await _context.Actors.FindAsync(id);
            if (actors == null)
            {
                return NotFound();
            }
            _context.Remove(actors);
            await _context.SaveChangesAsync();
            return Ok(200);
        }
    }
}