using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace backend.DTOs.Actor
{
    public class ActorCreateDto
    {
        [Required]
        [StringLength(120)]
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public IFormFile Picture { get; set; }
        public string Biography { get; set; }
    }
}