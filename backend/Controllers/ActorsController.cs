using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.DTOs.Actor;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class ActorsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly IStorageService _fileService;
        private readonly string containerName = "actors";

        public ActorsController(StoreContext context, IMapper mapper, IStorageService fileService)
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

        [HttpPost("searchByName")]
        public async Task<ActionResult<List<ActorsMovieDto>>> SearchByName([FromBody] string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return new List<ActorsMovieDto>();
            }
            return await _context.Actors.Where(x => x.Name.Contains(name))
            .OrderBy(x => x.Name)
            .Select(x => new ActorsMovieDto { Id = x.Id, Name = x.Name, Picture = x.Picture })
            .Take(5)
            .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ActorCreateDto actorCreateDto)
        {
            var actor = _mapper.Map<Actor>(actorCreateDto);

            if (actorCreateDto.Picture != null)
            {
                actor.Picture = await _fileService.SaveFile(containerName, actorCreateDto.Picture);
            }
            await _context.AddAsync(actor);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromForm] ActorCreateDto actorCreateDto)
        {
            var result = await _context.Actors.FindAsync(id);
            if (result == null)
            {
                return NotFound();
            }
            result = _mapper.Map(actorCreateDto, result);

            if (actorCreateDto.Picture != null)
            {
                result.Picture = await _fileService.EditFile(containerName, actorCreateDto.Picture, result.Picture);
            }
            await _context.SaveChangesAsync();
            return Ok();
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
    }
}