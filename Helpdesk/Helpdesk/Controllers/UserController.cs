using helpdesk.Controllers;
using Helpdesk.Entities;
using helpdesk.Helpers;
using helpdesk.Interfaces;
using Helpdesk.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Helpdesk.Controllers
{
    [Route("api/user")]
    [ApiController, Authorize]
    public class UserController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IAccount _account;
        private readonly Messages _messages = new Messages();
        private readonly ICompany _company;
        private readonly IUser _user;
        private readonly Cryptography _crypto = new Cryptography();
        private readonly SessionManagement _session = new SessionManagement();
        public UserController(ILogger<UserController> logger, IAccount account, ICompany company, IUser user)
        {
            _logger = logger;
            _account = account;
            _company = company;
            _user = user;
        }

        [HttpGet("details")]
        public async Task<dynamic> UserDetails()
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            return await _user.UserDetails(UserId);
        }
    }
}
