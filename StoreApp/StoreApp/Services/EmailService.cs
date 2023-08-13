using MailKit.Security;
using MimeKit.Text;
using MimeKit;
using StoreApp.Services.Interfaces;
using MailKit.Net.Smtp;

namespace StoreApp.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _config;

        public EmailService(IConfiguration config)
        {
            _config = config;
        }
        public async Task SendEmail(string subject, string body, string receiver)
        {
            
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(_config.GetSection("EmailUsername").Value));
            email.To.Add(MailboxAddress.Parse(receiver));
            email.Subject = subject;
            email.Body = new TextPart(TextFormat.Plain) { Text = body };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(_config.GetSection("EmailHost").Value, 587, SecureSocketOptions.StartTls);
            try
            {
                await smtp.AuthenticateAsync(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
            }
            catch(Exception e)
            {
                Console.WriteLine($"Greška prilikom slanja mejla: {e.Message}");
            }
            //await smtp.AuthenticateAsync(_config.GetSection("EmailUsername").Value, _config.GetSection("EmailPassword").Value);
            try
            {
                await smtp.SendAsync(email);
            }
            catch(Exception e)
            {
                Console.WriteLine($"Greška prilikom slanja mejla: {e.Message}");
                throw;
            }
            await smtp.DisconnectAsync(true);
           
        }
    }
}
