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

        public List<User> DeclinedUsers()
        {
            return _context.Users.Where(u => u.VerificationStatus == Enums.VerificationStatus.Declined).ToList();
        }

        public User FindUser(User user)
        {
            return _context?.Users?.SingleOrDefault<User>(u=>String.Equals(u.Username, user.Username));
        }

        public User FindUserByEmail(User userEmail)
        {
            return _context?.Users?.SingleOrDefault<User>(u => String.Equals(u.Email, userEmail.Email));
        }

        public User FindUserById(int id)
        {
            return (_context?.Users?.SingleOrDefault<User>(u=> u.Id==id));
        }

        public List<User> GetAllUsers()
        {
            return _context.Users.Where(u=>u.TypeOfUser!=Enums.UserType.Administrator).ToList();
        }

        public User Update(User user)
        {
            _context.Users?.Update(user);
            _context.SaveChanges();
            return user;
        }

        public List<User> UsersForVerification()
        {
            return _context.Users.Where(u => u.VerificationStatus == Enums.VerificationStatus.Waiting).ToList();
        }
    }
}
