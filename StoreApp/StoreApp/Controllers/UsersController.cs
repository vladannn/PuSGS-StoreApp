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

        [HttpPost("login")]
        public IActionResult Login([FromForm] LoginDTO loginDTO)
        {
            if (loginDTO != null)
            {
                var token = _userService.Login(loginDTO);

                if (token == "Email you have entered is not valid! Please check again your email!")
                    return BadRequest(token);
                if (token == "Invalid password! Please try again!")
                    return BadRequest(token);

                return Ok(token);
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost("google-login")]
        public IActionResult GoogleLogin([FromBody] TokenDTO tokenDTO)
        {
            if (tokenDTO != null)
            {
                var returnToken = _userService.GoogleLogin(tokenDTO);
                return Ok(returnToken);
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
