namespace Helpdesk.Models
{
    public class ChangePassword
    {
        public string OldPassword { get; set; } = null!;
        public string NewPassword { get; set; } = null!;
    }
}
