using AutoMapper;
using StoreApp.DTOs;
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
        public BuyerService(IProductRepository productRepository, IUserRepository userRepository, IMapper mapper) 
        { 
            _productRepository = productRepository;
            _userRepository = userRepository;
            _mapper = mapper;
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
