using AutoMapper;
using StoreApp.DTOs;
using StoreApp.Enums;
using StoreApp.Models;
using StoreApp.Repository.Interfaces;
using StoreApp.Services.Interfaces;

namespace StoreApp.Services
{
    public class AdminService : IAdminService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        public AdminService(IUserRepository userRepository, IMapper mapper, IEmailService emailService) 
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _emailService = emailService;
        }

        public List<GetUserDTO> DeclinedUsers()
        {
            List<User> users = _userRepository.DeclinedUsers();
            return _mapper.Map<List<GetUserDTO>>(users);
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

        public void VerifyUser(VerifyUserDTO verifyUserDTO)
        {
            User u = _userRepository.FindUserById(verifyUserDTO.Id);
            if (u == null)
            {
                throw new Exception("User with that ID doesn't exist!");
            }

            if(u.TypeOfUser==Enums.UserType.Buyer || u.TypeOfUser==Enums.UserType.Administrator)
            {
                throw new Exception("Only sellers can be verified!");
            }

            if(u.VerificationStatus!= Enums.VerificationStatus.Waiting)
            {
                throw new Exception("Only sellers that are  waiting can be accepted or declined!");
            }

            u.VerificationStatus = verifyUserDTO.VerificationStatus;

            string email = u.VerificationStatus == VerificationStatus.Accepted ? "You have been accepted." : "Your verification has been declined.";
            _emailService.SendEmail("Web store job - Verification status", email, u.Email);

            _userRepository.Update(u);

        }
    }
}
