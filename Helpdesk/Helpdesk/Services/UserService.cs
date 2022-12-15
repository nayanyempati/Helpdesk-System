using Helpdesk.Entities;
using Helpdesk.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Helpdesk.Services
{
    public class UserService : IUser
    {
        public async Task<dynamic> UserDetails(int userId)
        {
           using(dbcon _dbcon = new dbcon())
            {
                var details = await (from U in _dbcon.Users
                                     where U.Id == userId
                                     select new
                                     {
                                         U.Id,
                                         U.FirstName,
                                         U.LastName,
                                         U.Email,
                                         U.Photo,
                                         U.Role,
                                         U.CompanyName,
                                         U.Token
                                     }).FirstOrDefaultAsync();
                if(details!= null)
                {
                    return details;
                }
                return null;
            }
        }
    }
}
