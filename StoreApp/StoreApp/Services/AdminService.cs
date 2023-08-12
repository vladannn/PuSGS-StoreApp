using AutoMapper;
using StoreApp.DTOs;
using StoreApp.Models;
using StoreApp.Repository.Interfaces;
using StoreApp.Services.Interfaces;

namespace StoreApp.Services
{
    public class AdminService : IAdminService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public AdminService(IUserRepository userRepository, IMapper mapper) 
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public List<GetUserDTO> ForVerification()
        {
            List<User> users = _userRepository.UsersForVerification();
            return _mapper.Map<List<GetUserDTO>>(users);
        }

        public List<GetUserDTO> GetUsers()
        {
            List<User> users = _userRepository.GetAllUsers();
            return _mapper.Map<List<GetUserDTO>>(users);
        }
    }
}
