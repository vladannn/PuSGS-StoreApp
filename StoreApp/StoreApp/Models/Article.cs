namespace StoreApp.Models
{
    public class Article
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int Amount { get; set; }
        public byte[]? Image { get; set; }
        public double Price { get; set; }
        public int SellerId { get; set; }

    }
}
