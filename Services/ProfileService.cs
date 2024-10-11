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

    public async Task<ProfilePage?> GetProfilePage(string code, string USER_SESSION_KEY){
        User? user = await GetUserByProfileCode(code);
        if (user is null) return null;
        user.Password = "";

        int[] eventIds = _context.Event_Attendance
                            .Where(evAtt => evAtt.UserId == user.UserId)
                            .Select(evAtt => evAtt.EventId)
                            .ToArray();
        
        Event[] events = _context.Event
                            .Where(ev => ev.EventDate < DateOnly.FromDateTime(DateTime.Now))
                            .Include(evnt => evnt.Event_Attendances.Where(evAtt => evAtt.UserId == user.UserId))
                            .ThenInclude(evAtt => evAtt.Reviews)
                            .AsNoTracking()
                            .ToArray();

        bool viewingOwnPage = USER_SESSION_KEY == user.Email;
        Attendance attendance = await _context.Attendance.FirstAsync(att => att.UserId == user.UserId);
        bool isAtOffice = attendance.TimeArrived is not null;

        return new ProfilePage{ User = user, Events = events, ViewingOwnPage = viewingOwnPage, IsAtOffice = isAtOffice};
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

    public async Task<bool> ArriveToOffice(string USER_SESSION_KEY)
    {
        int userId = await _eventsService.GetUserId(USER_SESSION_KEY);
        Attendance attendance = await _context.Attendance.FirstAsync(att => att.UserId == userId);

        if (attendance.TimeArrived == null)
        {
            attendance.TimeArrived = DateTime.Now;
            await _context.SaveChangesAsync();
            return true;
        }

        return false;
    }

    public async Task<bool> LeaveOffice(string USER_SESSION_KEY)
    {
        int userId = await _eventsService.GetUserId(USER_SESSION_KEY);
        Attendance attendance = await _context.Attendance.FirstAsync(att => att.UserId == userId);

        if (attendance.TimeArrived != null)
        {
            attendance.TimeArrived = null;
            await _context.SaveChangesAsync();
            return true;
        }
        return false;
    }

    public async Task<ProfileSearch[]> GetProfiles(string search){
        // Get all users where search is included in first and last name
        // Then create ProfileSearch objects for every user, where ProfileCode == FirstName-LastName-UserId
        ProfileSearch[] profiles = await _context.User
            .Where(u => (u.FirstName.ToLower() + u.LastName.ToLower()).Contains(search))
            .Select(u => new ProfileSearch {
                Name = $"{u.FirstName} {u.LastName}", 
                ProfileCode = $"{u.FirstName}-{u.LastName}-{u.UserId}".ToLower()
            }).ToArrayAsync();

        return profiles;
    }

    public async Task<User?> GetUserByProfileCode(string code){
        // Creates a warning in the terminal, because "ToLower()" can't get translated to an SQL query,
        // meaning it will run slower. I do not have a better idea of how to do it
        // https://learn.microsoft.com/en-us/ef/core/miscellaneous/collations-and-case-sensitivity
        return await _context.User.FirstOrDefaultAsync(u =>
            code.ToLower() ==
            u.FirstName.ToLower() + "-" + u.LastName.ToLower() + "-" + u.UserId
        );
    }
}
