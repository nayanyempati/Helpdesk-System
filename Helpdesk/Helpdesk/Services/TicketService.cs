using Helpdesk.Entities;
using helpdesk.Helpers;
using helpdesk.Models;
using Helpdesk.Entities;
using Helpdesk.Interfaces;
using Helpdesk.Models;
using Microsoft.EntityFrameworkCore;
using shortid;

namespace Helpdesk.Services
{
    public class TicketService : ITickets
    {
        private readonly Messages _messages = new Messages();
        public async Task<ResponseMessage> CreateTicket(int userId, CreateTicketModel create)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var userDetails = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == userId);
                if (userDetails != null)
                {
                    string TicketToken = ShortId.Generate();
                    await _dbcon.Tickets.AddAsync(new Ticket
                    {
                        CreatedBy = userId,
                        CreatedByFullName = userDetails.FirstName + " " + userDetails.LastName,
                        CreatedOn = DateTime.Now,
                        Department = create.Department,
                        Description = create.Description,
                        Token = TicketToken,
                        Title = create.Ticket,
                        Priority = create.Priority,
                        Status = "Open",
                        AssignedToFullName="Not Assigned"

                    });
                    _dbcon.SaveChanges();
                    if (!string.IsNullOrWhiteSpace(create.Attachment))
                    {
                        await _dbcon.Attachments.AddAsync(new Attachment
                        {
                            CreatedBy = userId,
                            CreatedOn = DateTime.Now,
                            Link = create.Attachment,
                            TicketToken = TicketToken,
                            Token = ShortId.Generate()
                        });
                        _dbcon.SaveChanges();
                    }
                      ;
                    return new ResponseMessage { Message = TicketToken, Status = _messages.SUCCESS };
                }
                return new ResponseMessage { Message = _messages.UN_AUTHORIZED, Status = _messages.FAILED };
            }
        }

        public async Task<List<Ticket>> ListClientTickets(int userId)
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Tickets.Where(x => x.CreatedBy == userId || x.AssignedTo == userId).OrderByDescending(x=>x.Id).ToListAsync();
            }
        }

        public async Task<Ticket?> ViewTicket(int userId, string token)
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Tickets.Where(x => x.CreatedBy == userId && x.Token == token || x.AssignedTo == userId).FirstOrDefaultAsync();
            }
        }

        public async Task<List<Comment>> Comments(int userId, string tickettoken)
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Comments.Where(x => x.TicketToken == tickettoken).OrderByDescending(x => x.Id).ToListAsync();
            }
        }

        public async Task<ResponseMessage> CreateComment(CreateCommentModel create, string token, int UserId)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var userdetails = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == UserId);
                var ticketDetails =await _dbcon.Tickets.FirstOrDefaultAsync(x => x.Token == token);
                if (ticketDetails != null)
                {
                    await _dbcon.Comments.AddAsync(new Comment
                    {
                        Token = ShortId.Generate(),
                        CreatedBy = UserId,
                        CreatedOn = DateTime.Now,
                        Description = create.Comment,
                        TicketId = ticketDetails.Id,
                        TicketToken = token,
                        AttachmentLink = create.AttachmentLink,
                        CreatedByFullname = userdetails.FirstName + " " + userdetails.LastName
                    });;
                    try
                    {
                        _dbcon.SaveChanges();
                    }
                    catch(Exception ex)
                    {

                    }
                  


                    return new ResponseMessage { Message = _messages.ADDED_SUCCESSFULLY, Status = _messages.SUCCESS };

                }
                return new ResponseMessage { Message = _messages.FAILED, Status = _messages.UN_AUTHORIZED };
            }
        }

        public async Task<ResponseMessage> MarkAsResovled(string token, int userId)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Tickets.Where(x => x.Token == token && x.CreatedBy == userId || x.AssignedTo == userId).FirstOrDefaultAsync();
                if (details != null)
                {
                    details.Status = "Closed";
                    _dbcon.SaveChanges();
                    return new ResponseMessage { Message = _messages.TICKET_CLOSED, Status = _messages.SUCCESS };
                }
                return new ResponseMessage { Message = _messages.FAILED, Status = _messages.UN_AUTHORIZED };
            }
        }

        public async Task<Ticket?> TicketDetailsForAdmin(string token)
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Tickets.Where(x => x.Token == token).FirstOrDefaultAsync();
            }
        }
    }
}
