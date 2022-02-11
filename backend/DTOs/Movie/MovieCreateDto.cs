using System;
using System.Collections.Generic;
using backend.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.DTOs.Movie
{
    public class MovieCreateDto
    {

        public string Name { get; set; }
        public DateTime ReleaseDate { get; set; }
        public IFormFile Poster { get; set; }
        public string Summary { get; set; }
        public bool InTheater { get; set; }
        public string Trailer { get; set; }


        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> GenresIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<int>>))]
        public List<int> TheatersIds { get; set; }

        [ModelBinder(BinderType = typeof(TypeBinder<List<MovieActorCreateDto>>))]
        public List<MovieActorCreateDto> Actors { get; set; }


    }
}