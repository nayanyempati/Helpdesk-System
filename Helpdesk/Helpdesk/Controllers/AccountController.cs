using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using helpdesk.Helpers;
using helpdesk.Interfaces;

using helpdesk.Models;
using Helpdesk.Entities;
using shortid;
using Helpdesk.Models;
using System.Security.Claims;

namespace helpdesk.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IAccount _account;
        private readonly Messages _messages = new Messages();
        private readonly ICompany _company;
        private readonly Cryptography _crypto = new Cryptography();
        private readonly SessionManagement _session = new SessionManagement();
        public AccountController(ILogger<AccountController> logger, IAccount account, ICompany company)
        {
            _logger = logger;
            _account = account;
            _company = company;
        }




        
        [HttpPost("changepasseword"), Authorize]
        public async Task<ResponseMessage> ChangePassword([FromBody] ChangePassword change)
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            return await _account.ChangePassword(UserId, change);
        }

        [HttpPost("requestaccount"), AllowAnonymous]
        public async Task<ResponseMessage> RequestAccount([FromBody] RequestAccountModel account)
        {
            if (ModelState.IsValid)
            {
                var checkCompany = await _company.GetCompantDetailsByName(account.CompanyName);
                if (checkCompany != null)
                {
                    return await _account.RequestAccount(account, checkCompany);
                }
                return new ResponseMessage { Message = _messages.COMPANY_NOT_REGISTERED, Status = _messages.FAILED };
            }
            return new ResponseMessage { Message = _messages.ALL_FIELDS_ARE_REQURIED, Status = _messages.FAILED };

        }

        [HttpPost("activate/{token}"), AllowAnonymous]
        public async Task<ResponseMessage> ActivateAccount([FromBody] LoginModel activate, string token)
        {
            return await _account.ActivateAccount(activate, token);
        }

        [HttpPost("forgot/{email}"), AllowAnonymous]
        public async Task<ResponseMessage> ForgotPassword(string email)
        {

            if (!string.IsNullOrEmpty(email))
            {
                return await _account.ForgotPassword(email);
            }
            return new ResponseMessage { Message = _messages.ALL_FIELDS_ARE_REQURIED, Status = _messages.FAILED };
        }

        [HttpPost("reset/{email}/{token}"), AllowAnonymous]
        public async Task<ResponseMessage> ResetPassword([FromBody] ResetPasswordModel reset, string email, string token)
        {
            if (!string.IsNullOrEmpty(email) && !string.IsNullOrEmpty(token))
            {
                return await _account.ResetPassword(email, token, reset);
            }
            return new ResponseMessage { Message = _messages.ALL_FIELDS_ARE_REQURIED, Status = _messages.FAILED };
        }

        [HttpPost("login"), AllowAnonymous]
        public async Task<ActionResult> Login([FromBody] LoginModel login)
        {
            if (ModelState.IsValid)
            {
                var checkLogin = await _account.CheckLogin(login);
                if (checkLogin != null)
                {
                    return Ok(_session.GenerateAccessToken(checkLogin.Id, checkLogin.Email, checkLogin.Role));
                }
                return Ok(new ResponseMessage { Message = _messages.INVALID_CREDENTIALS, Status = _messages.FAILED });
            }
            return Ok(new ResponseMessage { Message = _messages.ALL_FIELDS_ARE_REQURIED, Status = _messages.FAILED });
        }

    }
}
