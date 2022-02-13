using System;
using System.Text;
using AutoMapper;
using backend.Data;
using backend.Filters;
using backend.Helpers;
using backend.Helpers.StorageService;
using backend.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using NetTopologySuite;
using NetTopologySuite.Geometries;

namespace backend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddDbContext<StoreContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnecton"), sqlOption =>
                sqlOption.UseNetTopologySuite()
             ));
            services.AddCors(options =>

                options.AddDefaultPolicy(builder =>
                {
                    var frontend = Configuration.GetValue<string>("frontend_url");
                    builder.WithOrigins(frontend).AllowAnyMethod().AllowAnyHeader().WithExposedHeaders(new string[] { "totalAmountOfRecords" });
                }));



            services.AddAutoMapper(typeof(Startup));
            services.AddSingleton<GeometryFactory>(NtsGeometryServices.Instance.CreateGeometryFactory(srid: 4326));
            services.AddSingleton(provider => new MapperConfiguration(config =>
            {
                var geometry = provider.GetRequiredService<GeometryFactory>();
                config.AddProfile(new MappingProfile(geometry));
            }).CreateMapper());
            services.AddScoped<IStorageService, AzureStorageService>();
            services.AddHttpContextAccessor();
            services.AddControllers(options => options.Filters.Add(typeof(CustomExceptionFilter)));

            services.AddScoped<IRepository, MockRepository>();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "backend", Version = "v1" });
            });

            services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<StoreContext>().AddDefaultTokenProviders();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(Configuration["jwtkey"])
                    ),
                    ClockSkew = TimeSpan.Zero

                };
            });
            // services.AddTransient<CustomFilter>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "backend v1"));
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseCors();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
