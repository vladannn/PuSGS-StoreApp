using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Bcpg;
using StoreApp.DTOs;
using StoreApp.Services.Interfaces;
using System.Data;

namespace StoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuyerController: ControllerBase
    {
        private readonly IBuyerService _buyerService;
        public BuyerController(IBuyerService buyerService) 
        {
            _buyerService = buyerService;
        }

        [HttpGet("get-products")]
        [Authorize(Roles = "Buyer")]
        public IActionResult GetProducts()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            var products = _buyerService.GetProducts(userId);

            return Ok(products);
        }

        [HttpGet("get-product/{id}")]
        [Authorize(Roles = "Buyer")]
        public IActionResult GetProduct(int id)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            var product = _buyerService.GetProduct(id, userId);

            return Ok(product);
        }

        [HttpPost("add-order")]
        [Authorize(Roles = "Buyer")]
        public IActionResult AddOrder(AddOrderDTO addOrderDTO)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            
            _buyerService.AddOrder(userId, addOrderDTO);

            return Ok();
        }

        [HttpGet("get-old-orders")]
        [Authorize(Roles = "Buyer")]
        public IActionResult GetOldOrders()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            var products = _buyerService.GetOldOrders(userId);

            return Ok(products);
        }

        [HttpGet("get-new-orders")]
        [Authorize(Roles = "Buyer")]
        public IActionResult GetNewOrders()
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            var products = _buyerService.GetNewOrders(userId);

            return Ok(products);
        }

        [HttpPut("cancel-order/{id}")]
        [Authorize(Roles = "Buyer")]
        public IActionResult CancelOrder(int id)
        {
            if (!int.TryParse(User.Claims.First(c => c.Type == "Id").Value, out int userId))
                throw new Exception("Not valid value for ID. Please logout and login again.");
            //int userId = 4;
            _buyerService.CancelOrder(id, userId);

            return Ok();
        }
    }
}
