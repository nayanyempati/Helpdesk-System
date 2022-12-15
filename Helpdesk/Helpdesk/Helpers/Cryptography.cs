using System.Security.Cryptography;
using System.Text;

namespace helpdesk.Helpers
{
    public class Cryptography
    {
        public string PasswordHash(string password)
        {
            using (var sha512 = SHA512.Create())
            {
                var hashedBytes = sha512.ComputeHash(Encoding.UTF8.GetBytes(password));
                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
            }
        }
    }
}
