using System.Text;
using Microsoft.AspNetCore.Mvc;
using StarterKit.Services;
using StarterKit.Models;

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
}

