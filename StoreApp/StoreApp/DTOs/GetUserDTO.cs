using StoreApp.Enums;
using System.ComponentModel.DataAnnotations;

namespace StoreApp.DTOs
{
    public class GetUserDTO
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? FullName { get; set; }
        public DateTime Birthday { get; set; }
        public string? Address { get; set; }
        public UserType TypeOfUser { get; set; }
        public byte[]? UserImage { get; set; }
    }
}
