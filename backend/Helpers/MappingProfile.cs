using System;
using AutoMapper;
using backend.DTOs;
using backend.DTOs.Actor;
using backend.DTOs.Genre;
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

        }
    }
}
