using System.ComponentModel.DataAnnotations;

namespace StoreApp.DTOs
{
    public class GetOrderItemDTO
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public double? Price { get; set; }
        public int Amount { get; set; }
        public int ArticleId { get; set; }
    }
}
