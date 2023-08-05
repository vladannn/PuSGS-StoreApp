using StoreApp.Enums;

namespace StoreApp.DTOs
{
    public class RegisterDTO
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public DateTime Birthday { get; set; }
        public string? Address { get; set; }
        public UserType TypeOfUser { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
