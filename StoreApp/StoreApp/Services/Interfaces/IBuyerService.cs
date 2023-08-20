using StoreApp.DTOs;

namespace StoreApp.Services.Interfaces
{
    public interface IBuyerService
    {
        List<ProductDTO> GetProducts(int id);
        ProductDTO GetProduct(int id, int userId);
        void AddOrder(int id, AddOrderDTO addOrderDTO);
        List<GetOrderDTO> GetOldOrders(int id);
        List<GetOrderDTO> GetNewOrders(int id);
        void CancelOrder(int orderId, int userId);
    }
}
