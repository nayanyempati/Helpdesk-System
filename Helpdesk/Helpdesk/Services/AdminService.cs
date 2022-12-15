using helpdesk.Helpers;
using helpdesk.Models;
using Helpdesk.Entities;
using Helpdesk.Interfaces;
using Helpdesk.Models;
using Microsoft.EntityFrameworkCore;
using shortid;

namespace Helpdesk.Services
{
    public class AdminService : IAdmin
    {
        private readonly Messages _messages = new Messages();
        private readonly MailHelper _mail = new MailHelper();
        private readonly Cryptography _crypto=new Cryptography();
        public async Task<List<Ticket>> ListTickets()
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Tickets.OrderByDescending(x => x.Id).ToListAsync();
            }
        }

        public async Task<ResponseMessage> AssignTicket(string token, int userid)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == userid);
                var ticketDetails = await _dbcon.Tickets.FirstOrDefaultAsync(x => x.Token == token);
                if (ticketDetails != null)
                {
                    ticketDetails.AssignedTo = userid;
                    ticketDetails.AssignedToFullName = details.FirstName + " " + details.LastName;
                    _dbcon.SaveChanges();
                    return new ResponseMessage { Message = _messages.TICKET_ASSIGNED + " to" + details.FirstName + " " + details.LastName, Status = _messages.UN_AUTHORIZED };
                }
                return new ResponseMessage { Message = _messages.DATA_NOT_FOUND, Status = _messages.FAILED };
            }
        }

        public async Task<IList<User>> ListEmployyes()
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Users.Where(x => x.CompanyId == 1).OrderByDescending(x => x.Id).ToListAsync();

            }
        }
        public async Task<ResponseMessage> AddEmployee(AddEmployeeModel account)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == account.Email);
                if (details == null)
                {
                    string Password = ShortId.Generate();
                    await _dbcon.Users.AddAsync(new User
                    {
                        CompanyName = "Helpdesk",
                        CreatedOn = DateTime.Now,
                        AccountStatus = "Active",
                        Email = account.Email,
                        FirstName = account.FirstName,
                        LastName = account.LastName,
                        Role = "employee",
                        LastUpdatedOn = DateTime.Now,
                        Token = ShortId.Generate(),
                        CompanyId = 1,
                        Photo = "https://cdn-icons-png.flaticon.com/512/3899/3899618.png",
                        EmailInvitationLink = ShortId.Generate(),
                        EmailInivitationExpiry = DateTime.Now.AddDays(1),
                        PasswordResetLink = Guid.NewGuid().ToString(),
                        Password = _crypto.PasswordHash(Password)
                    });
                    try
                    {
                        _mail.SendEmail(account.FirstName, account.Email, null, "Account Created", Password);
                        _dbcon.SaveChanges();
                    }
                    catch(Exception ex)
                    {

                    }
                  
                    return new ResponseMessage { Message = _messages.ACCOUNT_CREATED_SUCCESSFULLY, Status = _messages.SUCCESS };
                }
                return new ResponseMessage { Message = _messages.USER_EXSIST, Status = _messages.FAILED };
            }
        }

        public async Task<DashboardOverviewModel> DashboardOverview(int userid)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x=>x.Id== userid); 
                var dash = new DashboardOverviewModel();
                if (details.Role == "admin")
                {
                    dash.Closed = await _dbcon.Tickets.Where(x => x.Status == "Closed").CountAsync();
                    dash.Open = await _dbcon.Tickets.Where(x => x.Status == "Open").CountAsync();
                    dash.Tickets = await _dbcon.Tickets.CountAsync();
                    dash.employees = await _dbcon.Users.Where(x => x.CompanyId == 1).CountAsync();
                    dash.Clients = await _dbcon.Companies.CountAsync();
                }
                else
                {
                    dash.Closed = await _dbcon.Tickets.Where(x => x.Status == "Closed" && x.AssignedTo == userid).CountAsync();
                    dash.Open = await _dbcon.Tickets.Where(x => x.Status == "Open" && x.AssignedTo == userid).CountAsync();
                    dash.Tickets = await _dbcon.Tickets.CountAsync(x=>x.AssignedTo==userid);
                }
                
                return dash;
            }
        }

        public async Task<List<Company>> ListClients()
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Companies.ToListAsync();
            }
        }

        public async Task<ResponseMessage> AddClient(AddClientModel client)
        {
            using (dbcon _dbcon = new dbcon())
            {
                await _dbcon.Companies.AddAsync(new Company
                {
                    CompanyName=client.Clientname,
                    CreatedOn=DateTime.Now,
                    Token=ShortId.Generate(),
                    Logo=client.Logo,
                });
                _dbcon.SaveChanges();
                return new ResponseMessage { Message = _messages.ADDED_SUCCESSFULLY, Status = _messages.SUCCESS };
            }
        }

        public async Task<Company?> ClientDetails(string token)
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Companies.FirstOrDefaultAsync(x => x.Token == token);
            }
        }

        public async Task<List<User>> ClientEmployees(int id)
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Users.Where(x=>x.CompanyId==id).ToListAsync();
            }
        }

        public async Task<ResponseMessage> ApproveUser(string token)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x=>x.Token== token);
                if (details != null)
                {
                    string EmailLink=Guid.NewGuid().ToString();
                    details.AccountStatus = "Active";
                    details.EmailInvitationLink = EmailLink;
                    _dbcon.SaveChanges();
                    _mail.SendEmail(details.FirstName,details.Email, EmailLink, "Account Activation",null);
                    return new ResponseMessage { Message = _messages.UPDATED_SUCESFULLY, Status = _messages.SUCCESS };
                }
                return new ResponseMessage { Message = _messages.DATA_NOT_FOUND, Status = _messages.FAILED };
            }
        }

        public async Task<ResponseMessage> DisableUser(string token)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x => x.Token == token);
                if (details != null)
                {
                    details.AccountStatus = "InActive";
                    _dbcon.SaveChanges();
                    return new ResponseMessage { Message = _messages.UPDATED_SUCESFULLY, Status = _messages.SUCCESS };
                }
                return new ResponseMessage { Message = _messages.DATA_NOT_FOUND, Status = _messages.FAILED };
            }
        }

        public async Task<ResponseMessage> EnableUser(string token)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x => x.Token == token);
                if (details != null)
                {
                    details.AccountStatus = "Active";
                    _dbcon.SaveChanges();
                    return new ResponseMessage { Message = _messages.UPDATED_SUCESFULLY, Status = _messages.SUCCESS };
                }
                return new ResponseMessage { Message = _messages.DATA_NOT_FOUND, Status = _messages.FAILED };
            }
        }
    }
}
