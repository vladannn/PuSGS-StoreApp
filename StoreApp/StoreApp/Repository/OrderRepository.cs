using StoreApp.Data;
using StoreApp.Models;
using StoreApp.Repository.Interfaces;

namespace StoreApp.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private AppDbContext _context;

        public OrderRepository(AppDbContext appDbContext)
        {
            _context = appDbContext;
        }
        public void Add(Order order)
        {
            _context.Orders?.Add(order);
            _context.SaveChanges();
            
        }
    }
}
