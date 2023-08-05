using Microsoft.AspNetCore.Mvc;
using StoreApp.DTOs;
using StoreApp.Enums;
using StoreApp.Services.Interfaces;

namespace StoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public IActionResult Register([FromForm] RegisterDTO registerDTO)
        {
            if (registerDTO != null)
            {
                return Ok(_userService.Register(registerDTO));
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
