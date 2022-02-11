using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs.Theater;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class TheatersController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        public TheatersController(StoreContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;


        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TheaterDto>>> Get()
        {
            var theaters = await _context.Theaters.ToListAsync();
            return Ok(_mapper.Map<List<TheaterDto>>(theaters));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TheaterDto>> Get(int id)
        {
            var theater = await _context.Theaters.FindAsync(id);
            if (theater == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<TheaterDto>(theater));
        }

        [HttpPost]
        public async Task<ActionResult> Post(TheaterCreateDto theaterCreateDto)
        {
            var theater = _mapper.Map<Theater>(theaterCreateDto);

            _context.Theaters.Add(theater);
            await _context.SaveChangesAsync();
            return Ok(_mapper.Map<TheaterDto>(theater));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, TheaterCreateDto theaterUpdateDto)
        {
            var theater = await _context.Theaters.FindAsync(id);
            if (theater == null)
            {
                return NotFound();
            }
            _mapper.Map(theaterUpdateDto, theater);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var theater = await _context.Theaters.FindAsync(id);
            if (theater == null)
            {
                return NotFound();
            }
            _context.Theaters.Remove(theater);
            await _context.SaveChangesAsync();
            return Ok(200);
        }
    }
}