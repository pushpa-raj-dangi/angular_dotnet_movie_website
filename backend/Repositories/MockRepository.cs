using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;

namespace backend.Repositories
{
    public class MockRepository : IRepository
    {
        private readonly List<Genre> _genres;

        public MockRepository()
        {
            this._genres = new List<Genre>(){
                new Genre{Id=1,Name="Drama"},
                new Genre{Id =2, Name="Comedy"}
            };
        }
        public async Task<Genre> Genre(int id)
        {
            await Task.Delay(1);

            return _genres.Find(x => x.Id == id);
        }

        public async Task<List<Genre>> Genres()
        {

            await Task.Delay(1);
            return _genres;
        }


    }
}