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

    // This is the login page
    [HttpGet]
    public IActionResult Login()
    {
        return View();
    }


    [HttpPost("Login")]
    public IActionResult Login([FromBody] LoginBody loginBody)
    {
        // HttpContext.Session is a built-in object of ASP.NET Core for managing data across a user's session,
        // and it's more like a dictionary where you store "SetString()" and retrieve data "GetString()" using keys.
        if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") != null ||
            HttpContext.Session.GetString("USER_SESSION_KEY") != null)
            return Ok(false);

        if (loginBody.Username is null) return Unauthorized("Incorrect username");

        LoginStatus status = _loginService.CheckPassword(loginBody.Username, loginBody.Password ?? "");

        if (status == LoginStatus.Success) {
            if (!loginBody.Username.Contains("@")) 
                HttpContext.Session.SetString("ADMIN_SESSION_KEY", loginBody.Username.ToString());
            else
                HttpContext.Session.SetString("USER_SESSION_KEY", loginBody.Username.ToString());
        }

        return status switch {
            LoginStatus.Success => Ok($"Logged in {loginBody.Username}."),
            LoginStatus.IncorrectUsername => Unauthorized("Incorrect username"),
            LoginStatus.IncorrectPassword => Unauthorized("Incorrect password"),
            _ => BadRequest("")
        };
    }

    // registerBody has the same structure as loginBody, but the username will be set to email in the database
    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] LoginBody registerBody)
    {
        if (registerBody.Username is null || registerBody.Password is null || registerBody.FirstName is null || registerBody.LastName is null || registerBody.RecuringDays is null)  
        {
            return BadRequest("All fields are required");
        }

        var registrationResult = await _loginService.RegisterUser(registerBody.Username, registerBody.Password, registerBody.FirstName, registerBody.LastName, registerBody.RecuringDays);

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
        //string message = username == null ? "You are not logged in" : $"{username} is logged in";
        if(username == null) return Ok(false);
        return Ok(true);
    }


    [HttpGet("IsUserLoggedIn")]
    // checks if the caller is a user
    public IActionResult IsUserLoggedIn()
    {
        string? username = HttpContext.Session.GetString("USER_SESSION_KEY");
        //string message = username == null ? "You are not logged in" : $"{username} is logged in";
        if(username == null) return Ok(false);
        return Ok(true);
    }
    

    [HttpGet("Logout")]
    public IActionResult Logout()
    {
        // string? username = HttpContext.Session.GetString("ADMIN_SESSION_KEY");
        // string? email = HttpContext.Session.GetString("USER_SESSION_KEY");
        // if (username == null && email == null) return BadRequest("You are not logged in");
        HttpContext.Session.Remove("ADMIN_SESSION_KEY");
        HttpContext.Session.Remove("USER_SESSION_KEY");

        return Ok(true);
    }

}

public class LoginBody
{
    public string? Username { get; set; }
    public string? Password { get; set; }

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? RecuringDays {get; set; }
}

public enum RegistrationStatus
{
    Success,
    EmailAlreadyExists,
    Failure
}