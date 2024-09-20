namespace StarterKit.Services;

public interface ILoginService {
    public LoginStatus CheckPassword(string username, string inputPassword);
    public bool IsAdminLoggedIn(string? username);
}