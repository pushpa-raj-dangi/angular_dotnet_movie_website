using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace backend.Helpers.StorageService
{
    public class LocalFileUploadService : IStorageService
    {
        public LocalFileUploadService(IWebHostEnvironment env)
        {

        }
        public Task DeleteFile(string fileRoute, string containerName)
        {
            throw new System.NotImplementedException();
        }

        public Task<string> EditFile(string containerName, IFormFile file, string fileRoute)
        {
            throw new System.NotImplementedException();
        }

        public Task<string> SaveFile(string container, IFormFile file)
        {
            throw new System.NotImplementedException();
        }
    }
}