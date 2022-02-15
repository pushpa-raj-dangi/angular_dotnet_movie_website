using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using backend.Data;
using backend.DTOs;
using backend.DTOs.Account;
using backend.DTOs.Actor;
using backend.Helpers;
using backend.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
    public class AccountsController : BaseApiController
    {
        private readonly StoreContext _context;
        private readonly IMapper _mapper;
        private readonly IStorageService _fileService;
        private readonly string containerName = "actors";
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _coniguration;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AccountsController(StoreContext context, IMapper mapper, IStorageService fileService, UserManager<IdentityUser> userManager, IConfiguration coniguration, SignInManager<IdentityUser> signInManager
        )
        {
            _signInManager = signInManager;
            _coniguration = coniguration;
            _userManager = userManager;
            _fileService = fileService;
            _mapper = mapper;
            _context = context;

        }

        [HttpPost("create")]
        public async Task<ActionResult<AuthenticationResponse>> Post([FromBody] UserCredentials credentials)
        {
            var user = new IdentityUser
            {
                UserName = credentials.Email,
                Email = credentials.Email
            };

            var result = await _userManager.CreateAsync(user, credentials.Password);

            if (result.Succeeded)
            {
                return await CreateToken(credentials);
            }
            else
            {

                return BadRequest(result.Errors);
            }


        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] UserCredentials credentials)
        {
            var result = await _signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, isPersistent: false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return await CreateToken(credentials);
            }
            else
            {
                return BadRequest("Incorrect Login");
            }
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]

        public async Task<ActionResult<List<UserDto>>> Get([FromQuery] PaginationDto paginationDto)
        {
            var queryable = _context.Users.AsQueryable();
            await HttpContext.InsertParameterPaginatinInHeader(queryable);
            var users = await queryable.OrderBy(x => x.Email).Paginate(paginationDto).ToListAsync();
            return Ok(_mapper.Map<List<UserDto>>(users));
        }

        [HttpPost("createAdmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]

        public async Task<ActionResult> CreateAdmin([FromBody] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            await _userManager.AddClaimAsync(user, new Claim("role", "admin"));
            return Ok();
        }


        [HttpPost("removeAdmin")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Policy = "IsAdmin")]
        public async Task<ActionResult> DeleteAdmin([FromBody] string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);
            await _userManager.RemoveClaimAsync(user, new Claim("role", "admin"));
            return Ok();
        }

        private async Task<AuthenticationResponse> CreateToken(UserCredentials userCredentials)
        {
            var claims = new List<Claim>()
            {
                new Claim("email",userCredentials.Email)
            };

            var user = await _userManager.FindByNameAsync(userCredentials.Email);
            var claimDB = await _userManager.GetClaimsAsync(user);

            claims.AddRange(claimDB);


            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_coniguration["jwtkey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var expiration = DateTime.UtcNow.AddYears(1);
            var token = new JwtSecurityToken(issuer: null, audience: null, claims: claims, expires: expiration, signingCredentials: creds);

            return new AuthenticationResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                Expiration = expiration
            };



        }
    }
}