
using StarterKit.Controllers;

namespace StarterKit.Services;

public interface ILoginService {
    public LoginStatus CheckPassword(string username, string inputPassword);
    Task<RegistrationStatus> RegisterUser(string email, string password);

}