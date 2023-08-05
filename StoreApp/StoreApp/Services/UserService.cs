using AutoMapper;
using Org.BouncyCastle.Crypto.Generators;
using StoreApp.DTOs;
using StoreApp.Models;
using StoreApp.Repository.Interfaces;
using StoreApp.Services.Interfaces;

namespace StoreApp.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }
        public UserDTO Register(RegisterDTO registerDTO)
        {
            if (_userRepository.FindUser(new User { Username = registerDTO.Username }) != null)
            {
                return null;
            }
            if (_userRepository.FindUserByEmail(new User { Email = registerDTO.Email }) != null)
            {
                return null;
            }

            registerDTO.Password = BCrypt.Net.BCrypt.HashPassword(registerDTO.Password);

            var user = _mapper.Map<User>(registerDTO);
            var mehic = registerDTO.TypeOfUser.ToString();

            if (registerDTO.TypeOfUser==Enums.UserType.Seller)
            {
                user.TypeOfUser = Enums.UserType.Seller;
            }
            else if(registerDTO.TypeOfUser == Enums.UserType.Buyer)
            {
                user.TypeOfUser = Enums.UserType.Buyer;
            }

            if(user.TypeOfUser==Enums.UserType.Seller)
            {
                user.VerificationStatus = Enums.VerificationStatus.Waiting;
            }
            else
            {
                user.VerificationStatus= Enums.VerificationStatus.Accepted;
            }

            User u = _userRepository.AddUser(user);
            return new UserDTO { Id = u.Id, Username = u.Username, Address = u.Address, Birthday = u.Birthday, Email = u.Email, FullName = u.FullName, UserImage = u.UserImage, Password = u.Password, TypeOfUser = u.TypeOfUser };
        }
    }
}
