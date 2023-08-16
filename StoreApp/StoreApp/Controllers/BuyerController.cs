using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    }
}
