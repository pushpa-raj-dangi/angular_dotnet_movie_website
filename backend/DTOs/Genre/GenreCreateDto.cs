using System.ComponentModel.DataAnnotations;
using backend.Validations;

namespace backend.DTOs.Genre
{
    public class GenreCreateDto
    {

        [Required]
        [FirstLetterCapital]
        public string Name { get; set; }
    }
}