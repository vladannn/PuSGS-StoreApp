using StoreApp.Models;

namespace StoreApp.Repository.Interfaces
{
    public interface IOrderRepository
    {
        void Add(Order order);
    }
}
