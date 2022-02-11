using System.ComponentModel.DataAnnotations;
using NetTopologySuite.Geometries;

namespace backend.Models
{
    public class Theater
    {
        public int Id { get; set; }
        [Required]
        [StringLength(maximumLength: 75)]
        public string Name { get; set; }

        public Point Location { get; set; }





    }
}