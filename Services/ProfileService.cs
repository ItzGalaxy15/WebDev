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

    public async Task<ProfilePage?> GetProfilePage(string name, string USER_SESSION_KEY){
        User? user = await GetUserByProfileName(name);
        if (user is null) return null;
        user.Password = "";

        int[] eventIds = _context.Event_Attendance
                            .Where(evAtt => evAtt.UserId == user.UserId)
                            .Select(evAtt => evAtt.EventId)
                            .ToArray();
        
        Event[] events = _context.Event
                            .Include(evnt => evnt.Event_Attendances.Where(evAtt => evAtt.UserId == user.UserId))
                            .ThenInclude(evAtt => evAtt.Reviews)
                            .AsNoTracking()
                            .ToArray();

        bool viewingOwnPage = USER_SESSION_KEY == user.Email;

        return new ProfilePage{ User = user, Events = events, ViewingOwnPage = viewingOwnPage };
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

    public async Task<User?> GetUserByProfileName(string name){
        return await _context.User.FirstOrDefaultAsync(u => 
            u.FirstName.ToLower() + u.LastName.ToLower() == name.ToLower());
    }
}
