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
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers
{
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
                return CreateToken(credentials);
            }
            else
            {

                return BadRequest(result.Errors);
            }


        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthenticationResponse>> Login([FromBody] UserCredentials credentials)
        {
            var result = await _signInManager.PasswordSignInAsync(credentials.Email, credentials.Password, isPersistent: false, lockoutOnFailure: false);
            if (result.Succeeded)
            {
                return CreateToken(credentials);
            }
            else
            {
                return BadRequest("Incorrect Login");
            }
        }




        private AuthenticationResponse CreateToken(UserCredentials userCredentials)
        {
            var claims = new List<Claim>()
            {
                new Claim("email",userCredentials.Email)
            };

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