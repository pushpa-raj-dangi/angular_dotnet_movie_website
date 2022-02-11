using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class MovieActor
    {
        public int ActorId { get; set; }
        public int MovieId { get; set; }

        [StringLength(maximumLength: 75)]
        public string Character { get; set; }
        public int Order { get; set; }

        public Movie Movie { get; set; }
        public Actor Actor { get; set; }




    }
}