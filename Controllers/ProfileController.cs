using System.Text;
using Microsoft.AspNetCore.Mvc;
using StarterKit.Services;
using StarterKit.Models;
using Middleware.LoginRequired;

namespace StarterKit.Controllers;

// See events attended on user profile
// can Edit user profile (password, email)

[Route("api/v1/Profile")]
public class ProfileController : Controller 
{
    private readonly IProfileService _profileService;
    
    public ProfileController(IProfileService profileService)
    {
        _profileService = profileService;
    }

    [HttpGet("{name}")]
    public async Task<IActionResult> ViewProfile(string name){
        ProfilePage? profilePage = await _profileService.GetProfilePage(name, HttpContext.Session.GetString("USER_SESSION_KEY")!);
        if (profilePage is null) return BadRequest("Profile does not exist");

        return Ok(profilePage);
    }


    [HttpPut]
    public async Task<IActionResult> EditProfile([FromBody] EditedProfile edited){
        bool successfullyChanged = await _profileService.ChangeSettings(edited, HttpContext.Session.GetString("USER_SESSION_KEY")!);

        if (!successfullyChanged) return BadRequest("Could not change settings");

        // Log out user (if email or password was changed)
        if (edited.Password != null || edited.Email != null){
            HttpContext.Session.Remove("USER_SESSION_KEY");
            HttpContext.Response.Redirect("/api/v1/login", true);
            HttpContext.Response.StatusCode = 303;
            // HttpContext.Response.ContentType = "text/plain";
            // byte[] message = Encoding.UTF8.GetBytes("Please log in again");
            // await HttpContext.Response.Body.WriteAsync(message, 0, message.Length);
            var empty = new EmptyResult();
            return empty;
        }

        return Ok("Changed settings");
    }
}


public record EditedProfile(
    string? FirstName = null, string? LastName = null, string? Email = null,
    string? Password = null, string? RecurringDays = null
);


public class ProfilePage{
    public required User User { get; set; }
    public required Event[] Events { get; set;}
    public required bool ViewingOwnPage { get; set;}
}
