using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Movie
    {
        public int Id { get; set; }
        [StringLength(maximumLength: 75)]
        [Required]
        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Poster { get; set; }
        public string Summary { get; set; }
        public bool InTheater { get; set; }
        public string Trailer { get; set; }


        public List<MovieGenre> MoviesGenres { get; set; }
        public List<MovieTheater> MoviesTheaters { get; set; }
        public List<MovieActor> MoviesActors { get; set; }



    }
}