using AutoMapper;
using StoreApp.DTOs;
using StoreApp.Models;
using StoreApp.Repository.Interfaces;
using StoreApp.Services.Interfaces;

namespace StoreApp.Services
{
    public class SellerService : ISellerService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        public SellerService(IProductRepository productRepository, IMapper mapper, IUserRepository userRepository)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }
        public void AddProduct(int id, ProductDTO productDTO)
        {
            var article = _mapper.Map<Article>(productDTO);
            var u = _userRepository.FindUserById(id);
            if (u == null)
            {
                throw new Exception("There is no seller with that ID. Logout and login again!");
            }

            article.SellerId = id;
            if (productDTO.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    productDTO.ImageFile.CopyTo(ms);
                    article.Image = ms.ToArray();
                }
            }

            _productRepository.AddArticle(article);
        }

        public void DeleteProduct(int id, int userId)
        {
            var u = _userRepository.FindUserById(userId);
            if (u == null)
            {
                throw new Exception("There is no seller with that ID. Logout and login again!");
            }

            var a = _productRepository.FindArticle(id);
            if (a == null)
            {
                throw new Exception("Product is not yours!");
            }

            _productRepository.DeleteArticle(a);
        }

        public List<ProductDTO> GetMyProducts(int id)
        {
            var u = _userRepository.FindUserById(id);
            if (u == null)
            {
                throw new Exception("There is no seller with that ID. Logout and login again!");
            }

            var products = _productRepository.GetAllArticles(id);

            return _mapper.Map<List<ProductDTO>>(products);
        }

        public ProductDTO GetProductById(int id, int userId)
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
            else if (product.SellerId!=userId)
            {
                throw new Exception("You can't change this product! It's not yours!");
            }

            return _mapper.Map<ProductDTO>(product);
        }

        public ProductDTO UpdateProduct(int id, int userId,  ProductDTO productDTO)
        {
            var u = _userRepository.FindUserById(id);
            if (u == null)
            {
                throw new Exception("There is no seller with that ID. Logout and login again!");
            }

            var product = _productRepository.FindArticle(id);
            if (product == null)
            {
                throw new Exception("Product doesn't exist!");
            }
            else if (product.SellerId != userId)
            {
                throw new Exception("You can't change this product! It's not yours!");
            }

            product.Price = productDTO.Price;
            product.Name = productDTO.Name;
            product.Description = productDTO.Description;
            product.Amount = productDTO.Amount;

            if (productDTO.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    productDTO.ImageFile.CopyTo(ms);
                    product.Image = ms.ToArray();
                }
            }

            var a = _productRepository.Update(product);

            return _mapper.Map<ProductDTO>(a);

        }
    }
}
