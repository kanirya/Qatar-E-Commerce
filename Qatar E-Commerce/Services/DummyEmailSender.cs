using Microsoft.AspNetCore.Identity.UI.Services;
using System.Threading.Tasks;

public class DummyEmailSender : IEmailSender
{
    public Task SendEmailAsync(string email, string subject, string htmlMessage)
    {
        Console.WriteLine($"[DUMMY EMAIL] To: {email} | Subject: {subject}");
        return Task.CompletedTask;
    }
}
