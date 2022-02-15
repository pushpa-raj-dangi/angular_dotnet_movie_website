using System.Linq;
using System.Threading.Tasks;
using backend.Data;
using backend.DTOs.Rating;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    public class RatingsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        public RatingsController(StoreContext context, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _context = context;
        }


        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Post([FromBody] RatingDto ratingDto)
        {
            var email = HttpContext.User.Claims.FirstOrDefault(x => x.Type == "email").Value;
            var user = await _userManager.FindByEmailAsync(email);

            var userId = user.Id;
            var currentRate = await _context.Ratings.FirstOrDefaultAsync(x => x.Id == ratingDto.MovieId && x.UserId == user.Id);

            if (currentRate == null)
            {
                var rating = new Rating
                {
                    MovieId = ratingDto.MovieId,
                    Rate = ratingDto.Rating,
                    UserId = userId
                };
                _context.Ratings.Add(rating);

            }
            else
            {
                currentRate.Rate = ratingDto.Rating;
            }
            await _context.SaveChangesAsync();
            return Ok();

        }

    }
}