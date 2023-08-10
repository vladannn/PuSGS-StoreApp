using AutoMapper;
using Google.Apis.Auth;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json.Linq;
using Org.BouncyCastle.Crypto.Generators;
using StoreApp.DTOs;
using StoreApp.Enums;
using StoreApp.Models;
using StoreApp.Repository.Interfaces;
using StoreApp.Services.Interfaces;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace StoreApp.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IConfigurationSection _secretKey;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IMapper mapper, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _secretKey = configuration.GetSection("SecretKey");
            _configuration= configuration;
        }

        public string Login(LoginDTO loginDTO)
        {
            User u = new User { Email=loginDTO.Email, Password=loginDTO.Password};

            var user = _userRepository.FindUserByEmail(u);
            var password = BCrypt.Net.BCrypt.HashPassword(loginDTO.Password); ;

            if (user == null)
            {
                return "Email you have entered is not valid! Please check again your email!";
            }
            if(!BCrypt.Net.BCrypt.Verify(loginDTO.Password, user.Password))
            {
                return "Invalid password! Please try again!";
            }
            if(user.TypeOfUser == Enums.UserType.Seller)
            {
                if (user.VerificationStatus == Enums.VerificationStatus.Declined)
                {
                    return "Your request is not approved by administrator!";
                }
                else if(user.VerificationStatus == Enums.VerificationStatus.Waiting)
                {
                    return "You have to wait until your request is approved by administrator!";
                }
            }


            return CreateToken(user);
        }

        private string CreateToken(User user)
        {
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim("Id", user.Id.ToString()));
            claims.Add(new Claim("Email", user.Email!));
            claims.Add(new Claim(ClaimTypes.Name, user.Username!));
            claims.Add(new Claim(ClaimTypes.Role, user.TypeOfUser.ToString()));

            var signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                        issuer: "https://localhost:5001",
                        claims: claims,
                        audience: "all",
                        expires: DateTime.Now.AddYears(1),
                        signingCredentials: signInCredentials
                    );

            return new JwtSecurityTokenHandler().WriteToken(token);
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

        public async Task<string> GoogleLogin(TokenDTO tokenDTO)
        {
            //var str = _configuration["Google:clientId"]!;
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { _configuration["Google:clientId"]! }
            };

            var data = await GoogleJsonWebSignature.ValidateAsync(tokenDTO.Token, settings);

            User user = _userRepository.FindUserByEmail(new User { Email = data.Email });

            if (user != null)
            {
                return CreateToken(user);
            }

            user = new User
            {
                Email = data.Email,
                FullName = $"{data.GivenName} {data.FamilyName}",
                Birthday = DateTime.Now,
                Address = $"No address",
                Password = BCrypt.Net.BCrypt.HashPassword("123"),
                VerificationStatus = VerificationStatus.Accepted,
                TypeOfUser = UserType.Buyer,
                Username = data.GivenName + (new Random().Next() / 100000).ToString(),
            };

            if (data.Picture != null)
            {
                Convert.TryFromBase64String(data.Picture, user.UserImage, out int b);
            }
            
            _userRepository.AddUser(user);

            return CreateToken(user);

        }
    }
}
