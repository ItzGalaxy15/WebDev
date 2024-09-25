using StarterKit.Controllers;
using StarterKit.Models;
using StarterKit.Utils;

namespace StarterKit.Services;

public enum LoginStatus { IncorrectPassword, IncorrectUsername, Success }

public enum ADMIN_SESSION_KEY { adminLoggedIn }

public class LoginService : ILoginService
{
    public async Task<RegistrationStatus> RegisterUser(string email, string password)
    {
        if (!email.Contains("@")) return RegistrationStatus.Failure;

        var encryptedPassword = EncryptionHelper.EncryptPassword(password);
        var newUser = new User 
        { 
            Email = email, 
            Password = encryptedPassword,
            FirstName = "DefaultFirstName",
            LastName = "DefaultLastName",
            RecuringDays = string.Empty
        };
        _context.User.Add(newUser);
        await _context.SaveChangesAsync();
        return RegistrationStatus.Success;
    }

    private readonly DatabaseContext _context;

    public LoginService(DatabaseContext context)
    {
        _context = context;
    }

    public LoginStatus CheckPassword(string username, string inputPassword)
    {
        string? password;
        if (username.Contains("@")){
            password = _context.User.FirstOrDefault(a => a.Email == username)?.Password;
        }
        else {
            password = _context.Admin.FirstOrDefault(a => a.UserName == username)?.Password;
        }

        if (password == null)
        {
            return LoginStatus.IncorrectUsername;
        }
        if (password != EncryptionHelper.EncryptPassword(inputPassword))
        {
            return LoginStatus.IncorrectPassword;
        }

        return LoginStatus.Success;
    }

}