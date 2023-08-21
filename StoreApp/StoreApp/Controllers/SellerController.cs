using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.DTOs;
using StoreApp.Services;
using StoreApp.Services.Interfaces;
using System.Data;

namespace StoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController: ControllerBase
    {
        private ISellerService _sellerService;
        public SellerController(ISellerService sellerService)
        {
            _sellerService = sellerService;
        }

        [HttpPost("add-product")]
        [Authorize(Roles = "Seller")]
        public IActionResult AddProduct([FromForm] ProductDTO productDTO)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            _sellerService.AddProduct(userId, productDTO);

            return Ok();
        }

        [HttpGet("get-my-products")]
        [Authorize(Roles = "Seller")]
        public IActionResult GetMyProducts()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            var products = _sellerService.GetMyProducts(userId);

            return Ok(products);
        }
        [HttpDelete("get-my-products/{id}")]
        [Authorize(Roles = "Seller")]
        public IActionResult DeleteProduct(int id)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            _sellerService.DeleteProduct(id, userId);

            return Ok();
        }

        [HttpGet("get-product/{id}")]
        [Authorize(Roles = "Seller")]
        public IActionResult GetProduct(int id)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            var product = _sellerService.GetProductById(id, userId);

            return Ok(product);
        }

        [HttpPost("edit-product/{id}")]
        [Authorize(Roles = "Seller")]
        public IActionResult EditProduct(int id, [FromForm] ProductDTO productDTO)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            var product = _sellerService.UpdateProduct(id, userId, productDTO);

            return Ok(product);
        }

        [HttpGet("get-old-seller-orders")]
        [Authorize(Roles = "Seller")]
        public IActionResult GetOldOrders()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            var products = _sellerService.GetOldOrders(userId);

            return Ok(products);
        }

        [HttpGet("get-new-seller-orders")]
        [Authorize(Roles = "Seller")]
        public IActionResult GetNewOrders()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            var products = _sellerService.GetNewOrders(userId);

            return Ok(products);
        }
    }
}
