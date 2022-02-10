namespace backend.DTOs
{
    public class PaginationDto
    {
        public int Page { get; set; } = 1;
        private int perPage = 50;
        private readonly int maximum = 50;

        public int PerPage
        {
            get
            {
                return perPage;
            }
            set
            {
                perPage = (value > maximum) ? maximum : value;
            }
        }
    }
}