using System;
using System.Collections.Generic;
using AutoMapper;
using backend.DTOs;
using backend.DTOs.Actor;
using backend.DTOs.Genre;
using backend.DTOs.Movie;
using backend.DTOs.Theater;
using backend.Models;
using NetTopologySuite.Geometries;

namespace backend.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile(GeometryFactory factory)
        {
            CreateMap<GenreDto, Genre>().ReverseMap();
            CreateMap<GenreCreateDto, Genre>();

            CreateMap<ActorDto, Actor>().ReverseMap();
            CreateMap<ActorCreateDto, Actor>().ForMember(x => x.Picture, x => x.Ignore());

            CreateMap<Theater, TheaterDto>()
                 .ForMember(x => x.Latitude, dto => dto.MapFrom(prop => prop.Location.Y))
                 .ForMember(x => x.Longitude, dto => dto.MapFrom(prop => prop.Location.X));

            CreateMap<TheaterCreateDto, Theater>()
                .ForMember(x => x.Location, x => x.MapFrom(dto =>
                factory.CreatePoint(new Coordinate(dto.Longitude, dto.Lattitude))));

            CreateMap<MovieCreateDto, Movie>()
              .ForMember(x => x.Poster, options => options.Ignore())
              .ForMember(x => x.MoviesGenres, options => options.MapFrom(MapMoviesGenres))
              .ForMember(x => x.MoviesTheaters, options => options.MapFrom(MapMoviesTheaters))
              .ForMember(x => x.MoviesActors, options => options.MapFrom(MapMovieActors));


            // CreateMap<Movie, MovieDTO>()
            //                .ForMember(x => x.Genres, options => options.MapFrom(MapMoviesGenres))
            //                .ForMember(x => x.MovieTheaters, options => options.MapFrom(MapMovieTheatersMovies))
            //                .ForMember(x => x.Actors, options => options.MapFrom(MapMoviesActors));



        }


        private List<MovieGenre> MapMoviesGenres(MovieCreateDto movieCerate, Movie movie)
        {
            var result = new List<MovieGenre>();
            if (movieCerate.GenresIds == null)
            {
                return null;
            }

            foreach (var id in movieCerate.GenresIds)
            {
                result.Add(new MovieGenre() { GenreId = id });

            }
            return result;
        }

        private List<MovieTheater> MapMoviesTheaters(MovieCreateDto movieCerate, Movie movie)
        {
            var result = new List<MovieTheater>();
            if (movieCerate.TheatersIds == null)
            {
                return null;
            }

            foreach (var id in movieCerate.TheatersIds)
            {
                result.Add(new MovieTheater() { TheaterId = id });

            }
            return result;
        }
        private List<MovieActor> MapMovieActors(MovieCreateDto movieCerate, Movie movie)
        {
            var result = new List<MovieActor>();
            if (movieCerate.Actors == null)
            {
                return null;
            }

            foreach (var actor in movieCerate.Actors)
            {
                result.Add(new MovieActor() { ActorId = actor.Id, Character = actor.Character });

            }
            return result;
        }

    }
}
