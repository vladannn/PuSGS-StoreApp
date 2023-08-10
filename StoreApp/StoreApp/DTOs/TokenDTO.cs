using System.ComponentModel.DataAnnotations;

namespace StoreApp.DTOs
{
    public class TokenDTO
    {
        [Required]
        public string? Token { get; set; }
    }
}
