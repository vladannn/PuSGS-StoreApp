using StoreApp.Data;
using StoreApp.Models;
using StoreApp.Repository.Interfaces;

namespace StoreApp.Repository
{
    public class UserRepository : IUserRepository
    {
        private AppDbContext _context;

        public UserRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }
        public User AddUser(User newUser)
        {
            _context.Users?.Add(newUser);
            _context.SaveChanges();
            return newUser;
        }

        public User FindUser(User user)
        {
            return _context?.Users?.SingleOrDefault<User>(u=>String.Equals(u.Username, user.Username));
        }

        public User FindUserByEmail(User userEmail)
        {
            return _context?.Users?.SingleOrDefault<User>(u => String.Equals(u.Email, userEmail.Email));
        }
    }
}
