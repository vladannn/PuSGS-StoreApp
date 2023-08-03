using StoreApp.Enums;

namespace StoreApp.Models
{
    
    public class User
    {

        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public DateTime Birthday { get; set; }
        public string? Address { get; set; }
        public byte[]? UserImage { get; set; }
        public UserType TypeOfUser { get; set; }
        public VerificationStatus VerificationStatus { get; set; }
    }
}
