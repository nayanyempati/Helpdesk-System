using helpdesk.Models;
using Helpdesk.Entities;
using Helpdesk.Models;
using System.Threading.Tasks;

namespace Helpdesk.Interfaces
{
    public interface IAdmin
    {
        Task<List<Ticket>> ListTickets();
        Task<ResponseMessage> AssignTicket(string token, int userid);
        Task<IList<User>> ListEmployyes();
        Task<ResponseMessage> AddEmployee(AddEmployeeModel account);
        Task<DashboardOverviewModel> DashboardOverview(int UserId);
        Task<List<Company>> ListClients();
        Task<ResponseMessage> AddClient(AddClientModel client);
        Task<Company?> ClientDetails(string token);
        Task<List<User>> ClientEmployees(int id);
        Task<ResponseMessage> ApproveUser(string token);
        Task<ResponseMessage> DisableUser(string token);
        Task<ResponseMessage> EnableUser(string token);


    }
}
