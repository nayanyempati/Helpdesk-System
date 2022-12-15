using Microsoft.AspNetCore.Mvc;

using helpdesk.Models;
using Helpdesk.Entities;
using Helpdesk.Models;
using System.Threading.Tasks;

namespace helpdesk.Interfaces
{
    public interface IAccount
    {
        Task<ResponseMessage> ForgotPassword(string email);
        Task<ResponseMessage> RequestAccount(RequestAccountModel account, Company checkCompany);
        Task<ResponseMessage> ResetPassword(string email, string token, ResetPasswordModel reset);
        Task<User?> CheckLogin(LoginModel login);
        Task<ResponseMessage> ChangePassword(int userid, ChangePassword change);
        Task<ResponseMessage> ActivateAccount(LoginModel activate, string token);



    }
}
