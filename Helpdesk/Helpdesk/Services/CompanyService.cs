using Helpdesk.Entities;
using helpdesk.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace helpdesk.Services
{
    public class CompanyService : ICompany
    {
        public async Task<Company?> GetCompantDetailsByName(string companyName)
        {
            using (dbcon _dbcon = new dbcon())
            {
                return await _dbcon.Companies.FirstOrDefaultAsync(x=>x.CompanyName==companyName);
            }
        }
    }
}
