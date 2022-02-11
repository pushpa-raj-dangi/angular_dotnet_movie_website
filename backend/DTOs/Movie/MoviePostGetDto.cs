using System;
using System.Collections.Generic;
using backend.DTOs.Genre;
using backend.DTOs.Theater;
using backend.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.DTOs.Movie
{
    public class MoviePostGetDto
    {

        public List<GenreDto> Genres { get; set; }
        public List<TheaterDto> Theaters { get; set; }



    }
}