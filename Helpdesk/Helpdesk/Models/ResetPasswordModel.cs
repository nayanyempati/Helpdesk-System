namespace helpdesk.Models
{
    public class ResetPasswordModel
    {
        public string Password { get; set; } = null!;

        public string PasswordConfirm { get; set; } = null!;
    }
}
