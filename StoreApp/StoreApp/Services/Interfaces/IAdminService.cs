using StoreApp.DTOs;

namespace StoreApp.Services.Interfaces
{
    public interface IAdminService
    {
        List<GetUserDTO> GetUsers();
        List<GetUserDTO> ForVerification();
        void VerifyUser(VerifyUserDTO verifyUserDTO);
        List<GetUserDTO> DeclinedUsers();  
    }
}
