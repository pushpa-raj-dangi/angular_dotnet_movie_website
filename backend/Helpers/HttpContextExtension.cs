using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;

namespace backend.Helpers
{
    public static class HttpContextExtension
    {
        public async static Task InsertParameterPaginatinInHeader<T>(this HttpContext httpContext, IQueryable<T> queryable)
        {
            if (httpContext == null)
            {
                throw new ArgumentNullException(nameof(httpContext));
            }
            double count = await queryable.CountAsync();
            httpContext.Response.Headers.Add("totalAmountOfRows", count.ToString());

        }
    }
}