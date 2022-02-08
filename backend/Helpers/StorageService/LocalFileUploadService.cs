using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace backend.Helpers.StorageService
{
    public class LocalFileUploadService : IStorageService
    {
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public LocalFileUploadService(IWebHostEnvironment env, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _env = env;

        }


        public async Task<string> EditFile(string containerName, IFormFile file, string fileRoute)
        {
            await DeleteFile(fileRoute, containerName);
            return await SaveFile(containerName, file);
        }

        public Task DeleteFile(string fileRoute, string containerName)
        {
            if (string.IsNullOrEmpty(fileRoute))
            {
                return Task.CompletedTask;
            }
            var fileName = Path.GetFileName(fileRoute);
            var fileDirectory = Path.Combine(_env.WebRootPath, containerName, fileName);

            if (File.Exists(fileDirectory))
            {
                File.Delete(fileDirectory);
            }

            return Task.CompletedTask;
        }

        public async Task<string> SaveFile(string container, IFormFile file)
        {
            var extension = Path.GetExtension(file.FileName);
            var fileName = $"{Guid.NewGuid()}{extension}";
            string folder = Path.Combine(_env.WebRootPath, container);

            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string route = Path.Combine(folder, fileName);
            using (var ms = new MemoryStream())
            {
                await file.CopyToAsync(ms);
                var content = ms.ToArray();
                await File.WriteAllBytesAsync(route, content);
            }

            var url = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host}";
            var routeForDB = Path.Combine(url, container, fileName).Replace("\\", "/");
            return routeForDB;
        }
    }
}
