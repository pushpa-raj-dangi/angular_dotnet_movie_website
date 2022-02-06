using System;
using System.ComponentModel.DataAnnotations;

namespace backend.DTOs
{
    public class ActorCreateDto
    {
        [Required]
        [StringLength(120)]
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Picture { get; set; }

        public string Biography { get; set; }
    }
}