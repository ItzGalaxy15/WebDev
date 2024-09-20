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
        // this method checks if the password is correct

        var admin = _context.Admin.FirstOrDefault(a => a.UserName == username);
        if (admin == null)
        {
            return LoginStatus.IncorrectUsername;
        }
        if (admin.Password != EncryptionHelper.EncryptPassword(inputPassword))
        {
            return LoginStatus.IncorrectPassword;
        }

        return LoginStatus.Success;
    }

    public bool IsAdminLoggedIn(string? username){
        if (username == null) return false;
        return _context.Admin.Any(a => a.UserName == username);
    }
}