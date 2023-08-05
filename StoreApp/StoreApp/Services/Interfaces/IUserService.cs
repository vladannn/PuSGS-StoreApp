using StoreApp.DTOs;

namespace StoreApp.Services.Interfaces
{
    public interface IUserService
    {
        public UserDTO Register(RegisterDTO registerDTO);
    }
}
