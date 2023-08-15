using System.ComponentModel.DataAnnotations;

namespace StoreApp.DTOs
{
    public class ProductDTO
    {
        public int Id { get; set; }
        [Required]
        public string? Name { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        public int Amount { get; set; }
        [Required]
        public string? Description { get; set; }
        public byte[]? Image { get; set; }
        public IFormFile? ImageFile { get; set; }

    }
}
