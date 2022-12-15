using Helpdesk.Entities;

namespace Helpdesk.Interfaces
{
    public interface IUser
    {
        Task<dynamic> UserDetails(int userId);
    }
}
