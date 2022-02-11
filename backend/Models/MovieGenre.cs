using System;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class MovieGenre
    {
        public int GenreId { get; set; }
        public int MovieId { get; set; }

        public Movie Movie { get; set; }
        public Genre Genre { get; set; }

    }
}