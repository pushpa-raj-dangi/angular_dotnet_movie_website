using backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class StoreContext : IdentityDbContext
    {
        public StoreContext(DbContextOptions<StoreContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<MovieActor>().HasKey(x => new { x.ActorId, x.MovieId });
            modelBuilder.Entity<MovieGenre>().HasKey(x => new { x.GenreId, x.MovieId });
            modelBuilder.Entity<MovieTheater>().HasKey(x => new { x.TheaterId, x.MovieId });
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Genre> Genres { get; set; }
        public DbSet<Actor> Actors { get; set; }
        public DbSet<Theater> Theaters { get; set; }

        public DbSet<Movie> Movies { get; set; }
        public DbSet<MovieActor> MoviesActors { get; set; }
        public DbSet<MovieTheater> MoviesTheaters { get; set; }
        public DbSet<MovieGenre> MoviesGenres { get; set; }

        public DbSet<Rating> Ratings { get; set; }



    }
}