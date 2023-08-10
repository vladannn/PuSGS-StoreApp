using StoreApp.DTOs;

namespace StoreApp.Services.Interfaces
{
    public interface IUserService
    {
        public UserDTO Register(RegisterDTO registerDTO);
        public string Login(LoginDTO loginDTO);

        public Task<string> GoogleLogin(TokenDTO tokenDTO);
    }
}
