using System.ComponentModel.DataAnnotations;

namespace backend.DTOs.Rating
{
    public class RatingDto
    {
        [Range(1, 5)]
        public int Rating { get; set; }
        public int MovieId { get; set; }
    }
}