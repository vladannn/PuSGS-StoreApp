using AutoMapper;
using StoreApp.DTOs;
using StoreApp.Models;

namespace StoreApp.Mapping
{
    public class Mapping: Profile
    {
        public Mapping() 
        {
            CreateMap<User, RegisterDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
        }
    }
}
