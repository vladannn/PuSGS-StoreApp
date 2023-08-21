using StoreApp.DTOs;
using StoreApp.Models;

namespace StoreApp.Services.Interfaces
{
    public interface ISellerService
    {
        public void AddProduct(int id, ProductDTO productDTO);
        public List<ProductDTO> GetMyProducts(int id);
        public void DeleteProduct(int id, int userId);
        public ProductDTO GetProductById(int id, int userId);
        public ProductDTO UpdateProduct(int id, int userId,  ProductDTO productDTO);
        public List<GetOrderDTO> GetOldOrders(int id);
        public List<GetOrderDTO> GetNewOrders(int id);
    }
}
