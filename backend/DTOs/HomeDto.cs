using System.Collections.Generic;
using backend.DTOs.Movie;

namespace backend.DTOs
{
    public class HomeDto
    {


        public List<MovieDto> InTheaters { get; set; }
        public List<MovieDto> Upcomings { get; set; }

    }
}