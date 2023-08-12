﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StoreApp.DTOs;
using StoreApp.Services.Interfaces;
using System.Data;

namespace StoreApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController: ControllerBase
    {
        private IAdminService _adminService;
        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("get-all-users")]
        [Authorize(Roles = "Administrator")]
        public IActionResult GetAllUsers() 
        {
            List<GetUserDTO> users = _adminService.GetUsers();
            return Ok(users);
        }

        [HttpGet("for-verification")]
        [Authorize(Roles = "Administrator")]
        public IActionResult ForVerification()
        {
            List<GetUserDTO> users = _adminService.ForVerification();
            return Ok(users);
        }
    }
}