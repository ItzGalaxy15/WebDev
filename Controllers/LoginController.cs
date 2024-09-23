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
        // checks if an admin is already logged in
        if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") != null) return Ok("You are already logged in");

        if (loginBody.Username is null) return Unauthorized("Incorrect username");

        LoginStatus status = _loginService.CheckPassword(loginBody.Username, loginBody.Password ?? "");

        // Stores the username as a session key
        if (status == LoginStatus.Success) HttpContext.Session.SetString("ADMIN_SESSION_KEY", loginBody.Username.ToString());

        return status switch {
            LoginStatus.Success => Ok($"Logged in {loginBody.Username}."),
            LoginStatus.IncorrectUsername => Unauthorized("Incorrect username"),
            LoginStatus.IncorrectPassword => Unauthorized("Incorrect password"),
            _ => BadRequest("")
        };
    }

    [HttpGet("IsAdminLoggedIn")]
    // checks if the caller is an admin
    public IActionResult IsAdminLoggedIn()
    {
        string? username = HttpContext.Session.GetString("ADMIN_SESSION_KEY");
        // bool loggedIn = _loginService.IsAdminLoggedIn(username);
        return username == null ? Unauthorized("You are not logged in") : Ok($"{username} is logged in");
    }

    [HttpGet("Logout")]
    // makes the admin log out
    public IActionResult Logout()
    {
        string? username = HttpContext.Session.GetString("ADMIN_SESSION_KEY");
        if (username == null) return BadRequest("You are not logged in");
        HttpContext.Session.Remove("ADMIN_SESSION_KEY");
        return Ok($"Logged out {username}");
    }

}

public class LoginBody
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}
