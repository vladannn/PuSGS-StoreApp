using StoreApp.Models;

namespace StoreApp.Repository.Interfaces
{
    public interface IUserRepository
    {
        User AddUser(User newUser);
        User FindUser(User user);
        User FindUserByEmail(User userEmail);
        User FindUserById(int id);
        User Update(User user);
    }
}
