using System.Linq;
using backend.DTOs;

namespace backend.Helpers
{
    public static class IQueryableExtension
    {
        public static IQueryable<T> Paginate<T>(this IQueryable<T> queryable, PaginationDto paginationDto)
        {
            return queryable.Skip((paginationDto.Page - 1) * paginationDto.PerPage).Take(paginationDto.PerPage);
        }
    }
}