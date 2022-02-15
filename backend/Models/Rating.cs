using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace backend.Models
{
    public class Rating
    {
        public int Id { get; set; }
        [Required]
        [Range(1, 5)]
        public int Rate { get; set; }

        public int MovieId { get; set; }
        public Movie Movie { get; set; }

        public string UserId { get; set; }
        public IdentityUser User { get; set; }




    }
}