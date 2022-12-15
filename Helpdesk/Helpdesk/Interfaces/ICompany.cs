
using Helpdesk.Entities;

namespace helpdesk.Interfaces
{
    public interface ICompany
    {
        Task<Company?> GetCompantDetailsByName(string companyName);
    }
}
