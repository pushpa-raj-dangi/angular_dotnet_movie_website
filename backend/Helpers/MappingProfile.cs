using AutoMapper;
using backend.DTOs;
using backend.DTOs.Actor;
using backend.DTOs.Genre;
using backend.Models;

namespace backend.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<GenreDto, Genre>().ReverseMap();
            CreateMap<GenreCreateDto, Genre>();

            CreateMap<ActorDto, Actor>().ReverseMap();
            CreateMap<ActorCreateDto, Actor>().ForMember(x => x.Picture, x => x.Ignore());
        }
    }
}