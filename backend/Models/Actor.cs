using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Actor
    {
        public int Id { get; set; }
        [Required]
        [StringLength(120)]
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Picture { get; set; }

        public string Biography { get; set; }

    }
}