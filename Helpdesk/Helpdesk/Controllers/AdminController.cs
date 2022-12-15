using helpdesk.Helpers;
using helpdesk.Interfaces;
using helpdesk.Models;
using Helpdesk.Entities;
using Helpdesk.Interfaces;
using Helpdesk.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Helpdesk.Controllers
{
    [Route("api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly Messages _messages = new Messages();
        private readonly ICompany _company;
        private readonly IAdmin _admin;
        private readonly Cryptography _crypto = new Cryptography();
        private readonly SessionManagement _session = new SessionManagement();
        private readonly ITickets _tickets;
        public AdminController(ILogger<AdminController> logger, ICompany company, ITickets tickets, IAdmin admin)
        {
            _logger = logger;
            _company = company;
            _tickets = tickets;
            _admin= admin;
        }

        [HttpGet("listtickets")]
        public async Task<List<Ticket>> ListTickets()
        {
            return await _admin.ListTickets();
        }

        [HttpGet("dashboardcount")]
        public async Task<DashboardOverviewModel> DashboardOverview()
        {
            var identity = (ClaimsIdentity)User.Identity;
            int UserId = Convert.ToInt32(identity.Name);
            return await _admin.DashboardOverview(UserId);
        }

        [HttpPost("assign/{token}/{userid}")]
        public async Task<ResponseMessage> AssignTicket(string token, int userid)
        {
           return await _admin.AssignTicket(token, userid);
        }

        [HttpGet("viewticket/{token}")]
        public async Task<Ticket?> TicketDetails(string token)
        {
            return await _tickets.TicketDetailsForAdmin(token);
        }

        [HttpGet("listemployees")]
        public async Task<IList<User>> ListEmployyes()
        {
            return await _admin.ListEmployyes();
        }

        [HttpGet("listclient")]
        public async Task<List<Company>> ListClients()
        {
            return await _admin.ListClients();
        }

        [HttpPost("addemployee")]
        public async Task<ResponseMessage> AddEmployee([FromBody] AddEmployeeModel employee)
        {
            return await _admin.AddEmployee(employee);
        }

        [HttpPost("addclient")]
        public async Task<ResponseMessage> AddClient(AddClientModel client)
        {

            return await _admin.AddClient(client);
        }

        [HttpGet("client/{token}")]
        public async Task<Company?> ClientDetails(string token)
        {
            return await _admin.ClientDetails(token);
        }

        [HttpGet("client/employees/{id}")]
        public async Task<List<User>> ClientEmployees(int id)
        {
            return await _admin.ClientEmployees(id);
        }

        [HttpPost("approveuser/{token}")]
        public async Task<ResponseMessage> ApproveUser(string token)
        {
            return await _admin.ApproveUser(token);
        }

        [HttpPost("disableuser/{token}")]
        public async Task<ResponseMessage> DisableUser(string token)
        {
            return await _admin.DisableUser(token);
        }

        [HttpPost("enableuser/{token}")]
        public async Task<ResponseMessage> EnableUser(string token)
        {
            return await _admin.EnableUser(token);
        }



    }
}
