using StoreApp.Enums;

namespace StoreApp.DTOs
{
    public class GetOrderDTO
    {
        public int Id { get; set; }
        public string? DeliveryAddress { get; set; }
        public string? Comment { get; set; }
        public DateTime OrderTime { get; set; }
        public DateTime DeliveryTime { get; set; }
        public double? SumPrice { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public List<GetOrderItemDTO>? OrderItems { get; set; }
    }
}
