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

    [HttpGet("{code}")]
    public async Task<IActionResult> ViewProfile(string code){
        ProfilePage? profilePage = await _profileService.GetProfilePage(code, HttpContext.Session.GetString("USER_SESSION_KEY")!);
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
            // HttpContext.Response.Redirect("/api/v1/login", true);
            // HttpContext.Response.StatusCode = 303;
            // HttpContext.Response.ContentType = "text/plain";
            // byte[] message = Encoding.UTF8.GetBytes("Please log in again");
            // await HttpContext.Response.Body.WriteAsync(message, 0, message.Length);
            // var empty = new EmptyResult();
            // return empty;
            return Ok("Changed settings and logged out");
        }

        return Ok("Changed settings");
    }

    [HttpPut("attendance/leave")]
    public async Task<IActionResult> LeaveOffice()
    {
        bool check = await _profileService.LeaveOffice(HttpContext.Session.GetString("USER_SESSION_KEY")!);

        if (check) return Ok("left office!");
        else return BadRequest("You are not even at the office!!");
    }

    [HttpPut("attendance/arrive")]
    public async Task<IActionResult> ArriveToOffice()
    {
        bool check = await _profileService.ArriveToOffice(HttpContext.Session.GetString("USER_SESSION_KEY")!);

        if (check) return Ok("You arrived to the office :)");
        else return BadRequest("you already arrived to the office!");
    }

    [HttpGet("profiles/find")]
    public async Task<IActionResult> GetProfiles([FromQuery] string? search = null){
        ProfileSearch[] profiles = await _profileService.GetProfiles(search?.ToLower() ?? "");
        return Ok(profiles);
    }
}




public record EditedProfile(
    string? FirstName = null, string? LastName = null, string? Email = null,
    string? Password = null, string? RecurringDays = null
);

public class ProfilePage {
    public required User User { get; set; }
    public required Event[] Events { get; set;}
    public required bool ViewingOwnPage { get; set;}
    public required bool IsAtOffice { get ; set; }
}

public class ProfileSearch {
    public required string Name { get; set; }
    public required string ProfileCode { get; set; }
}