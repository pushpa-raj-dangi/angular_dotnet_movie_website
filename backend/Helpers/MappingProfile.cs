using AutoMapper;
using backend.DTOs;
using backend.Models;

namespace backend.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<GenreDto, Genre>().ReverseMap();
            CreateMap<GenreCreateDto, Genre>();

            CreateMap<ActorDto, Actor>();
            CreateMap<ActorCreateDto, Actor>().ForMember(x => x.Picture, x => x.Ignore());
        }
    }
}