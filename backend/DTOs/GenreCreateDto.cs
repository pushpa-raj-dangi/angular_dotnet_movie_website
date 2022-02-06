using System.ComponentModel.DataAnnotations;
using backend.Validations;

namespace backend.DTOs
{
    public class GenreCreateDto
    {

        [Required]
        [FirstLetterCapital]
        public string Name { get; set; }
    }
}