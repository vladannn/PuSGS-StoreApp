using MailKit.Search;
using Microsoft.EntityFrameworkCore;
using StoreApp.Data;
using StoreApp.DTOs;
using StoreApp.Enums;
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

        public List<Order> GetNewOrders(int id)
        {
            List<Order>? orders = _context.Orders.Include(x => x.OrderItems)
            .Where(x => x.BuyerId == id && x.OrderStatus == OrderStatus.Delivered && x.DeliveryTime > DateTime.Now).ToList();

            return orders;
        }

        public List<Order> GetOldOrders(int id)
        {
            List<Order>? orders = _context.Orders.Include(x => x.OrderItems)
            .Where(x => x.BuyerId == id && x.OrderStatus == OrderStatus.Delivered && x.DeliveryTime <= DateTime.Now).ToList();

            return orders; 
        }

        public Order GetOrderById(int id)
        {
            Order? order = _context.Orders.FirstOrDefault(x => x.Id == id);
            order.OrderItems = GetOrderItemsOnOrder(id);
            return order;
        }
        public List<OrderItem> GetOrderItemsOnOrder(int orderId)
        {
            return _context.OrderItems.Where(x => x.OrderId == orderId).ToList();
        }
        public void Update(Order order)
        {
            _context.Orders?.Update(order);
            _context.SaveChanges();
        }
    }
}
