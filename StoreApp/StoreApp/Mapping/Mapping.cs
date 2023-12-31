﻿using AutoMapper;
using StoreApp.DTOs;
using StoreApp.Models;

namespace StoreApp.Mapping
{
    public class Mapping: Profile
    {
        public Mapping() 
        {
            CreateMap<RegisterDTO, User>()
            .ForMember(dest => dest.UserImage, opt => opt.MapFrom<ImageFileToByteArrayResolver>());
            CreateMap<User, RegisterDTO>();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, EditUserDTO>().ReverseMap();
            CreateMap<User, GetUserDTO>().ReverseMap();
            CreateMap<Article, ProductDTO>().ReverseMap();
            CreateMap<Order, AddOrderDTO>().ReverseMap();
            CreateMap<OrderItem, AddOrderItemDTO>().ReverseMap();
            CreateMap<Order, GetOrderDTO>().ReverseMap();
            CreateMap<OrderItem, GetOrderItemDTO>().ReverseMap();
        }
    }
}
