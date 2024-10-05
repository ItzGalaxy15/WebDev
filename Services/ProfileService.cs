using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using StarterKit.Models;
using StarterKit.Utils;
using StarterKit.Controllers;

namespace StarterKit.Services;

public class ProfileService : IProfileService 
{
    private readonly DatabaseContext _context;
    private readonly IEventsService _eventsService;

    private readonly HashSet<string> _validDays = new(){"mo", "tu", "we", "th", "fr"};

    public ProfileService(DatabaseContext context, IEventsService eventsService)
    {
        _context = context;
        _eventsService = eventsService;
    }

    public async Task<bool> ChangeSettings(EditedProfile edited, string USER_SESSION_KEY){
        int? userId = await _eventsService.GetUserId(USER_SESSION_KEY);
        if (userId == null) return false;

        User? user = await _context.User.FirstOrDefaultAsync(u => u.UserId == userId);
        if (user == null) return false;

        if (edited.RecurringDays is not null){
            string[] days = edited.RecurringDays.Split(',');
            foreach (string day in days){
                if (!_validDays.Contains(day)) return false;
            }
            user.RecuringDays = edited.RecurringDays;
        }

        if (edited.FirstName is not null) user.FirstName = edited.FirstName;
        if (edited.LastName is not null) user.LastName = edited.LastName;
        if (edited.Email is not null) user.Email = edited.Email;
        if (edited.Password is not null) user.Password = Utils.EncryptionHelper.EncryptPassword(edited.Password);

        await _context.SaveChangesAsync();
        return true;
    }
}
