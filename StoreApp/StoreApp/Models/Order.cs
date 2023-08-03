using StoreApp.Enums;

namespace StoreApp.Models
{
    public class Order
    {
        public int Id { get; set; }  
        public string? Comment { get; set; }    
        public string? DeliveryAddress { get; set; }
   
        public DateTime OrderTime { get; set; } 
        public double OrderPrice { get; set; }
        public double SumPrice { get; set; }
        public OrderStatus OrderStatus { get; set; }

        public DateTime DeliveryTime { get; set; }  
        public int BuyerId { get; set; }    
        public List<OrderItem>? OrderItems { get; set; }

    }
}
