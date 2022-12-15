using Helpdesk.Entities;
using helpdesk.Models;
using Helpdesk.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace Helpdesk.Interfaces
{
    public interface ITickets
    {
        Task<ResponseMessage> CreateTicket(int userId, CreateTicketModel create);
        Task<List<Ticket>> ListClientTickets(int userId);
        Task<Ticket?> ViewTicket(int userId, string token);
        Task<List<Comment>> Comments(int userId, string tickettoken);
        Task<ResponseMessage> CreateComment(CreateCommentModel create,string token, int UserId);
        Task<ResponseMessage> MarkAsResovled(string token, int userId);
        Task<Ticket?> TicketDetailsForAdmin(string token);
    }
}
