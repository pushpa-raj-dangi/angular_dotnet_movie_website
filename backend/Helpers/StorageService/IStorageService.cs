using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace backend.Helpers
{
    public interface IStorageService
    {
        Task DeleteFile(string fileRoute, string containerName);
        Task<string> SaveFile(string container, IFormFile file);
        Task<string> EditFile(string containerName, IFormFile file, string fileRoute);

    }
}