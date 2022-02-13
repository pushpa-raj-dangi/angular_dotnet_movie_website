using System;
using System.Collections.Generic;
using backend.DTOs.Actor;
using backend.DTOs.Genre;
using backend.DTOs.Theater;

namespace backend.DTOs.Movie
{
    public class MovieFilterDto
    {

        public int Page { get; set; }

        public int PerPage { get; set; }

        public PaginationDto PaginationDto
        {
            get
            {
                return new PaginationDto()
                {
                    Page = Page,
                    PerPage = PerPage
                };
            }
        }
        public bool Upcomings { get; set; }
        public bool InTheaters { get; set; }
        public int GenreId { get; set; }
        public string Name { get; set; }
    }
}


