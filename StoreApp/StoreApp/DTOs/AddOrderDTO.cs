using System.ComponentModel.DataAnnotations;

namespace StoreApp.DTOs
{
    public class AddOrderDTO
    {
        public string? DeliveryAddress { get; set; }
        public string? Comment { get; set; }
        public List<AddOrderItemDTO>? OrderItems { get; set; }
    }
}
