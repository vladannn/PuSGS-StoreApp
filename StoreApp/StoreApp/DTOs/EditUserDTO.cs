using System.ComponentModel.DataAnnotations;

namespace StoreApp.DTOs
{
    public class EditUserDTO
    {
        [Required, RegularExpression("[a-zA-Z0-9]+"), MinLength(3), MaxLength(20)]
        public string? Username { get; set; }
        [Required, MinLength(6)]
        public string? Password { get; set; }
        [Required, EmailAddress]
        public string? Email { get; set; }
        [Required]
        public string? FullName { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public string? Address { get; set; }
        public byte[]? Image { get; set; }
        public IFormFile? ImageFile { get; set; }
    }
}
