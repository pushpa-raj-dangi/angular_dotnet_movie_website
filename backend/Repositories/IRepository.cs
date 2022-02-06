using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public interface IRepository
    {

        Task<List<Genre>> Genres();
        Task<Genre> Genre(int id);
    }
}