using StoreApp.DTOs;
using StoreApp.Models;

namespace StoreApp.Repository.Interfaces
{
    public interface IOrderRepository
    {
        void Add(Order order);
        List<Order> GetOldOrders(int id);
        List<Order> GetNewOrders(int id);
        Order GetOrderById(int id);
        void Update(Order order);
        List<OrderItem> GetOrderItemsOnOrder(int orderId);
        List<Order> GetOldOrdersSeller(int id);
        List<Order> GetNewOrdersSeller(int id);
    }
}
