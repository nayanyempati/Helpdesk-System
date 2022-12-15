using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using Helpdesk.Entities;
using helpdesk.Helpers;
using helpdesk.Interfaces;

using helpdesk.Models;
using shortid;
using Helpdesk.Models;

namespace helpdesk.Services
{
    public class AccountService : IAccount
    {
        private Messages _messages = new Messages();
        private Securedata _securedata = new Securedata();
        private MailHelper _mailer = new MailHelper();
        private SessionManagement _sessionManagement = new SessionManagement();
        private Cryptography _crypto = new Cryptography();

        public async Task<ResponseMessage> ForgotPassword(string email)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == email && x.AccountStatus!= "Pending Approval");
                if (details != null)
                {
                    string Token = Guid.NewGuid().ToString();
                    details.PasswordResetLink = Token;
                    _dbcon.SaveChanges();
                    _mailer.SendEmail(details.FirstName, email, Token, "Forgot Password","");
                }
                return new ResponseMessage { Message = _messages.PASSWORD_RESET_LINK_SENT, Status = _messages.SUCCESS };
            }
        }

        public async Task<User?> CheckLogin(LoginModel login)
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == login.Email && x.AccountStatus!= "Pending Approval" && x.Password == _crypto.PasswordHash(login.password));
            }
        }

        public async Task<ResponseMessage> RequestAccount(RequestAccountModel account, Company checkCompany)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == account.Email);
                if (details == null)
                {
                    await _dbcon.Users.AddAsync(new User
                    {
                        Email = account.Email,
                        AccountStatus = "Pending Approval",
                        CreatedOn = DateTime.Now,
                        Token = ShortId.Generate(),
                        FirstName = account.FirstName,
                        LastName = account.LastName,
                        Role = "client",
                        Photo = "https://cdn-icons-png.flaticon.com/512/3899/3899618.png",
                        LastUpdatedOn = DateTime.Now,
                        PasswordResetLink=Guid.NewGuid().ToString(),
                        EmailInivitationExpiry=DateTime.Now.AddDays(5),
                        Password= Guid.NewGuid().ToString(),
                        EmailInvitationLink=Guid.NewGuid().ToString(),
                        CompanyId= checkCompany.Id,
                        CompanyName= checkCompany.CompanyName
                    });
                    _dbcon.SaveChanges();
                    return new ResponseMessage { Message = _messages.REQUEST_RECEIVED_FOR_ACCOUNT, Status = _messages.SUCCESS };
                }
                return new ResponseMessage { Message = _messages.USER_EXSIST, Status = _messages.SUCCESS };
            }
        }

        public async Task<ResponseMessage> ResetPassword(string email, string token, ResetPasswordModel reset)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == email && x.PasswordResetLink == token);
                if (details != null)
                {
                    details.Password = _crypto.PasswordHash(reset.PasswordConfirm);
                    _dbcon.SaveChanges();
                    return new ResponseMessage { Message = _messages.PASSWORD_CHANGED_SUCCESSSFULLY, Status = _messages.FAILED };
                }
                return new ResponseMessage { Message = _messages.TOKEN_EXPIRED_INVALID, Status = _messages.FAILED };
            }
        }

        public async Task<ResponseMessage> ChangePassword(int userid, ChangePassword change )
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x => x.Id == userid && x.Password == _crypto.PasswordHash(change.OldPassword));
                if(details != null)
                {
                    details.Password = _crypto.PasswordHash(change.NewPassword);
                    _dbcon.SaveChanges();
                    return new ResponseMessage { Message = _messages.UPDATED_SUCESFULLY, Status = _messages.SUCCESS };
                }
                return new ResponseMessage { Message = _messages.INVALID_OLD_PASSWORD, Status = _messages.FAILED };
            }
        }

        public async Task<ResponseMessage> ActivateAccount(LoginModel activate, string token)
        {
            using (dbcon _dbcon = new dbcon())
            {
                var details = await _dbcon.Users.FirstOrDefaultAsync(x => x.Email == activate.Email && x.EmailInvitationLink == token);
                if (details != null)
                {
                    details.Password = _crypto.PasswordHash(activate.password);
                    _dbcon.SaveChanges();
                    return new ResponseMessage { Message = _messages.USER_ACTIVATION_SUCCESSFULL, Status = _messages.SUCCESS };
                }
                return new ResponseMessage { Message = _messages.DATA_NOT_FOUND, Status = _messages.FAILED };
            }
        }
    }
}
