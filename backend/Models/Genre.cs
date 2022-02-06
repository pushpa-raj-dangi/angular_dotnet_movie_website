using System.ComponentModel.DataAnnotations;
using backend.Validations;

namespace backend.Models
{
    public class Genre
    {
        public int Id { get; set; }
        [Required]
        [FirstLetterCapital]
        public string Name { get; set; }

    }
}