using System;
using System.Collections.Generic;
using backend.DTOs.Genre;
using backend.DTOs.Theater;
using backend.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.DTOs.Movie
{
    public class MoviePutGetDto
    {


        public MovieDto Movie { get; set; }
        public List<GenreDto> SelectedGenres { get; set; }

        public List<GenreDto> NonSelectedGenres { get; set; }
        public List<TheaterDto> SelectedTheaters { get; set; }
        public List<TheaterDto> NonSelectedTheaters { get; set; }

        public List<ActorsMovieDto> Actors { get; set; }




    }
}