using System.ComponentModel.DataAnnotations;

namespace StoreApp.DTOs
{
    public class AddOrderItemDTO
    {
        public int ArticleId { get; set; }
        public int Amount { get; set; }
    }
}
