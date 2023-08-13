using StoreApp.Enums;
using System.ComponentModel.DataAnnotations;

namespace StoreApp.DTOs
{
    public class VerifyUserDTO
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public VerificationStatus VerificationStatus { get; set; }
    }
}
