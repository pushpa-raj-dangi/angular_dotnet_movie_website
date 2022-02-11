using System;
using System.Collections.Generic;
using backend.DTOs.Actor;
using backend.DTOs.Genre;
using backend.DTOs.Theater;

namespace backend.DTOs.Movie
{
    public class MovieDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string Poster { get; set; }
        public string Summary { get; set; }
        public bool InTheater { get; set; }
        public string Trailer { get; set; }

        public List<GenreDto> Genres { get; set; }
        public List<TheaterDto> Theaters { get; set; }
        public List<ActorsMovieDto> Actors { get; set; }



    }
}