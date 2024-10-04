using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using StarterKit.Models;
using StarterKit.Utils;

namespace StarterKit.Services;

public class AttendEventService : IAttendEventService 
{
    private readonly IEventsService _eventsService;
    private readonly DatabaseContext _dbcontext;
     public readonly HashSet<int> ValidRating = new(){0, 1, 2, 3, 4, 5};
    public AttendEventService(DatabaseContext context, IEventsService eventsService)
    {
        _dbcontext = context;
        _eventsService = eventsService;
    }
    public async Task<bool> CreateEventAttendance(int eventId, int userId)
    {
        // Check if the user and event actually exist
        //if (_context.User.Any(user => user.UserId == newEventAttendance.UserId) == false) return false;
        if (_dbcontext.Event.Any(_event => _event.EventId == eventId) == false) return false;
        
        // if the Event_Attendance already exists
        if (await _dbcontext.Event_Attendance.AnyAsync(evAtt => evAtt.EventId == eventId && evAtt.UserId == userId)) return false;

        _dbcontext.Event_Attendance.Add(new Event_Attendance { EventId = eventId, UserId = userId} );
        await _dbcontext.SaveChangesAsync();
        return true;
    }

    public async Task<bool> AddReview(Review newReview, int AttId)
    {
        // the rating not a number between 0-5, its invalid
        if (!ValidRating.Contains(newReview.Rating))
        {
            return false;
        }
        //adding Event_AttendanceId for the foreignkeys
        newReview.Event_AttendanceId = AttId;
        
        _dbcontext.Review.Add(newReview);
        await _dbcontext.SaveChangesAsync();
        return true;
    }
    
    // It tries to set currentTime to event_Attendance.Time property
    public async Task<bool> SetEventAttendance(string USER_SESSION_KEY, int eventId)
    {
        // checks if the user is registered for the specific event
        (bool check, int event_AttendanceId)  = await _eventsService.CheckUserAttendedEvent(USER_SESSION_KEY, eventId);
        if (check == false) return false;

        // Gets event_Attendance object based on event_AttendanceId
        Event_Attendance? event_Attendance = await _dbcontext.Event_Attendance.FirstOrDefaultAsync(e_a => e_a.Event_AttendanceId == event_AttendanceId);
        if (event_Attendance == null) return false;

        //  Check if the attendance time is already set
        if (event_Attendance.Time != null) return false;

        // Get the event details
        Event? eventt =  await _dbcontext.Event.FirstOrDefaultAsync(e => e.EventId == eventId) ;
        if (eventt == null) return false;

        //  Check if today is the event date
        DateOnly today = DateOnly.FromDateTime(DateTime.Now);
        if (today != eventt.EventDate) return false;
        
        TimeSpan currentTime = DateTime.Now.TimeOfDay; // currentTime has this format 17:12:47.6037312
        // Check if current time is between event start and end time
        if (currentTime >= eventt.StartTime && currentTime < eventt.EndTime)
        {
            event_Attendance.Time = currentTime;
            await _context.SaveChangesAsync(); // Save changes to database
            return false;
        }

        return false;
    }


    // GetEventAttendancees

    public async Task<List<User?>> GetEventAttendees(int eventId)
    {
        return await _dbcontext.Event_Attendance
            .Where(ea => ea.EventId == eventId)
            .Select(ea => ea.User)
            .ToListAsync();
    }


    //IsUserAttendee
    public async Task<bool> IsUserAttendee(int userId, int eventId)
    {
        return await _dbcontext.Event_Attendance
            .AnyAsync(ea => ea.EventId == eventId && ea.UserId == userId);
    }

    //DeleteEventAttendance
    public async Task<bool> DeleteEventAttendance(int eventId, int userId)
    {
        var eventAttendance = await _dbcontext.Event_Attendance
            .Where(ea => ea.EventId == eventId && ea.UserId == userId)
            .FirstOrDefaultAsync();

        if (eventAttendance == null) return false;

        _dbcontext.Event_Attendance.Remove(eventAttendance);
        await _dbcontext.SaveChangesAsync();
        return true;
    }






}
