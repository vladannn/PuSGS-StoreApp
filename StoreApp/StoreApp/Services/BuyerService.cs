using AutoMapper;
using StoreApp.DTOs;
using StoreApp.Models;
using StoreApp.Repository;
using StoreApp.Repository.Interfaces;
using StoreApp.Services.Interfaces;

namespace StoreApp.Services
{
    public class BuyerService: IBuyerService
    {
        private readonly IProductRepository _productRepository;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IOrderRepository _orderRepository;
        public BuyerService(IProductRepository productRepository, IUserRepository userRepository, IMapper mapper, IOrderRepository orderRepository) 
        { 
            _productRepository = productRepository;
            _userRepository = userRepository;
            _mapper = mapper;
            _orderRepository = orderRepository;
        }

        public void AddOrder(int id, AddOrderDTO addOrderDTO)
        {
            var u = _userRepository.FindUserById(id);
            if (u == null)
            {
                throw new Exception("There is no seller with that ID. Logout and login again!");
            }

            if(addOrderDTO.OrderItems?.Count==0)
            {
                throw new Exception("There is no products in your cart!");
            }

            List<OrderItem> orderItems = _mapper.Map<List<OrderItem>>(addOrderDTO.OrderItems);
            Order order = _mapper.Map<Order>(addOrderDTO);

            order.OrderItems = orderItems;
            order.OrderPrice = 0;
            List<int> sellers = new List<int>();

            foreach (OrderItem item in orderItems)
            {
                Article? article = _productRepository.FindArticle(item.ArticleId);
                if (article == null)
                {
                    throw new Exception("Article doesn't exist.");
                }

                if (article.Amount < item.Amount)
                {
                    throw new Exception("There are not enough articles available.");
                }

                item.Name = article.Name;
                item.Price = article.Price;

                article.Amount -= item.Amount;

                _productRepository.Update(article);

                order.OrderPrice += item.Amount * item.Price;
                if (!sellers.Contains(article.SellerId))
                {
                    sellers.Add(article.SellerId);
                }

              
            }
            order.SumPrice = order.OrderPrice + 5; // 5 is delivery price
            order.BuyerId = id;
            order.OrderTime = DateTime.Now;
            order.DeliveryTime = DateTime.Now.AddDays(1).AddHours(1);
            order.OrderStatus = Enums.OrderStatus.Delivered;

            _orderRepository.Add(order);
        }

        public ProductDTO GetProduct(int id, int userId)
        {
            var u = _userRepository.FindUserById(userId);
            if (u == null)
            {
                throw new Exception("There is no seller with that ID. Logout and login again!");
            }

            var product = _productRepository.FindArticle(id);
            if (product == null)
            {
                throw new Exception("Product doesn't exist!");
            }

            return _mapper.Map<ProductDTO>(product);
        }

        public List<ProductDTO> GetProducts(int id)
        {
            var u = _userRepository.FindUserById(id);
            if (u == null)
            {
                throw new Exception("There is no seller with that ID. Logout and login again!");
            }

            var products = _productRepository.GetArticles();

            return _mapper.Map<List<ProductDTO>>(products);
        }
    }
}
