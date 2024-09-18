using StarterKit.Models;
using StarterKit.Utils;

namespace StarterKit.Services;

public enum LoginStatus { IncorrectPassword, IncorrectUsername, Success }

public enum ADMIN_SESSION_KEY { adminLoggedIn }

public class LoginService : ILoginService
{

    private readonly DatabaseContext _context;

    public LoginService(DatabaseContext context)
    {
        _context = context;
    }

    public LoginStatus CheckPassword(string username, string inputPassword)
    {
        // TODO: Make this method check the password with what is in the database

        var admin = _context.Admin.FirstOrDefault(a => a.UserName == username);
        if (admin == null)
        {
            return LoginStatus.IncorrectUsername;
        }
        if (admin.Password == EncryptionHelper.EncryptPassword(inputPassword))
        {
            return LoginStatus.Success;
        }

        return LoginStatus.IncorrectPassword;
    }
}