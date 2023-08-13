namespace StoreApp.Services.Interfaces
{
    public interface IEmailService
    {
        public Task SendEmail(string subject, string body, string receiver);
    }
}
