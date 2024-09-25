using System.Text;
using Microsoft.AspNetCore.Mvc;
using StarterKit.Services;

namespace StarterKit.Controllers;


[Route("api/v1/Login")]
public class LoginController : Controller
{
    private readonly ILoginService _loginService;
    

    public LoginController(ILoginService loginService)
    {
        _loginService = loginService;
    }

    [HttpPost("Login")]
    public IActionResult Login([FromBody] LoginBody loginBody)
    {
        if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") != null ||
            HttpContext.Session.GetString("USER_SESSION_KEY") != null)
            return Ok("You are already logged in");

        if (loginBody.Username is null) return Unauthorized("Incorrect username");

        LoginStatus status = _loginService.CheckPassword(loginBody.Username, loginBody.Password ?? "");

        if (status == LoginStatus.Success) {
            if (!loginBody.Username.Contains("@")) 
                HttpContext.Session.SetString("ADMIN_SESSION_KEY", loginBody.Username.ToString());
            HttpContext.Session.SetString("USER_SESSION_KEY", loginBody.Username.ToString());
        }

        return status switch {
            LoginStatus.Success => Ok($"Logged in {loginBody.Username}."),
            LoginStatus.IncorrectUsername => Unauthorized("Incorrect username"),
            LoginStatus.IncorrectPassword => Unauthorized("Incorrect password"),
            _ => BadRequest("")
        };
    }

    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] RegisterBody registerBody)
    {
        if (registerBody.Email is null || registerBody.Password is null)
        {
            return BadRequest("Email and password are required");
        }

        var registrationResult = await _loginService.RegisterUser(registerBody.Email, registerBody.Password);

        return registrationResult switch
        {
            RegistrationStatus.Success => Ok("User registered successfully"),
            RegistrationStatus.EmailAlreadyExists => Conflict("Email already exists"),
            _ => BadRequest("Registration failed")
        };
    }



    [HttpGet("IsAdminLoggedIn")]
    // checks if the caller is an admin
    public IActionResult IsAdminLoggedIn()
    {
        string? username = HttpContext.Session.GetString("ADMIN_SESSION_KEY");
        return username == null ? Unauthorized("You are not logged in") : Ok($"{username} is logged in");
    }

    [HttpGet("IsUserLoggedIn")]
    // checks if the caller is a user
    public IActionResult IsUserLoggedIn()
    {
        string? username = HttpContext.Session.GetString("USER_SESSION_KEY");
        return username == null ? Unauthorized("You are not logged in") : Ok($"{username} is logged in");
    }
    

    [HttpGet("Logout")]
    public IActionResult Logout()
    {
        string? username = HttpContext.Session.GetString("ADMIN_SESSION_KEY");
        string? email = HttpContext.Session.GetString("USER_SESSION_KEY");
        if (username == null && email == null) return BadRequest("You are not logged in");
        HttpContext.Session.Remove("ADMIN_SESSION_KEY");
        HttpContext.Session.Remove("USER_SESSION_KEY");

        return Ok($"Logged out {username ?? email}");
    }

}

public class LoginBody
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}

public class RegisterBody
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}

public enum RegistrationStatus
{
    Success,
    EmailAlreadyExists,
    Failure
}