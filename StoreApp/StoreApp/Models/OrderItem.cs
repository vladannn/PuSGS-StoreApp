namespace StoreApp.Models
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int ArticleId { get; set; }
        public string? Name { get; set; }   
        public int Amount { get; set; }
        public double Price { get; set; }  
        public Order? Order { get; set; }
        
        public int OrderId { get; set; }    

    }
}
