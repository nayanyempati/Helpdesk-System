using System.Net.Mail;

namespace helpdesk.Helpers
{
    public class MailHelper
    {
        private Messages _messages = new Messages();
        public string SendEmail(string firstname, string email, string link, string type, string password)
        {
            string activationEmailLink = string.Empty;
            var config = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").Build();
            string body = string.Empty;
            string MailType = string.Empty;
            string Subject = string.Empty;
            if (type == "Account Activation")
            {
                MailType = "AccountActivation.html";
            }
            if (type == "Forgot Password")
            {
                MailType = "ForgotPassword.html";
            }
            if (type == "Account Created")
            {
                MailType = "AccountCreated.html";
            }
            using (StreamReader reader = new StreamReader(Directory.GetCurrentDirectory() + "/Templates/" + MailType))
            {
                body = reader.ReadToEnd();
            }
            body = body.Replace("{{firstname}}", firstname);
            if (type == "Account Activation")
            {

                Subject = "Activate Account"; ;
                activationEmailLink = config["appUrl"] + "/auth/activate/" + link;
                body = body.Replace("{{email}}", email);
                body = body.Replace("{{ACTIVATION_LINK}}", activationEmailLink);

            }
            if (type == "Forgot Password")
            {

                Subject = "Reset Password";
                activationEmailLink = config["appUrl"] + "/auth/reset/" + link;
                body = body.Replace("{{ACTIVATION_LINK}}", activationEmailLink);
            }
            if (type == "Account Created")
            {
             
                Subject = "Account Created";
                body = body.Replace("{{URL}}", config["appUrl"]);
                body = body.Replace("{{email}}", email);
                body = body.Replace("{{password}}", password);
            }

            if (config != null)
            {
                using (var mail = new MailMessage())
                {
                    mail.From = new MailAddress(config["EmailConfiguration:Email"]);
                    mail.To.Add(email);
                    mail.IsBodyHtml = true;
                    mail.Body = body;
                    mail.Subject = Subject;
                    SmtpClient smtpClient = new SmtpClient();
                    smtpClient.DeliveryMethod = SmtpDeliveryMethod.Network;
                    smtpClient.UseDefaultCredentials = false;
                    smtpClient.Host = config["EmailConfiguration:SmtpServer"];
                    smtpClient.Port = Convert.ToInt32(config["EmailConfiguration:Port"]);
                    smtpClient.Credentials = new System.Net.NetworkCredential(config["EmailConfiguration:Email"].ToString(), config["EmailConfiguration:Password"].ToString());
                    smtpClient.EnableSsl = true;
                    try
                    {
                        Task t = Task.Run(async () =>
                        {
                            await smtpClient.SendMailAsync(mail);
                        });
                        t.Wait();
                        return _messages.MAIL_SENT;
                    }
                    catch (IOException e)
                    {
                        return e.Message;
                    }
                    catch (FormatException e)
                    {
                        return e.Message;
                    }
                    catch (TimeoutException e)
                    {
                        return e.Message;
                    }
                }

            }
            return _messages.MISSING_CONFIGURATION;
        }
    }
}
