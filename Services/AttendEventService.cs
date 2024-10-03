using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using StarterKit.Models;
using StarterKit.Utils;

namespace StarterKit.Services;

public class AttendEventService : IAttendEventService 
{
    private readonly IEventsService _eventsService;
    private readonly DatabaseContext _context;
     public readonly HashSet<int> ValidRating = new(){0, 1, 2, 3, 4, 5};
    public AttendEventService(DatabaseContext context, IEventsService eventsService)
    {
        _context = context;
        _eventsService = eventsService;
    }
    public async Task<bool> CreateEventAttendance(int eventId, int userId)
    {
        // Check if the user and event actually exist
        //if (_context.User.Any(user => user.UserId == newEventAttendance.UserId) == false) return false;
        if (_context.Event.Any(_event => _event.EventId == eventId) == false) return false;
        
        // if the Event_Attendance already exists
        if (await _context.Event_Attendance.AnyAsync(evAtt => evAtt.EventId == eventId && evAtt.UserId == userId)) return false;

        _context.Event_Attendance.Add(new Event_Attendance { EventId = eventId, UserId = userId} );
        await _context.SaveChangesAsync();
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
        
        _context.Review.Add(newReview);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> SetEventAttendance(string USER_SESSION_KEY, int eventId)
    {
        // checks if the user is registered for a specific Event
        (bool check, int event_AttendanceId)  = await _eventsService.CheckUserAttendedEvent(USER_SESSION_KEY, eventId);
        if (check == false) return false;
        
        // Gets event_Attendance object based on event_AttendanceId
        Event_Attendance? event_Attendance = await _context.Event_Attendance.FirstOrDefaultAsync(e_a => e_a.Event_AttendanceId == event_AttendanceId);
        if (event_Attendance == null) return false;

        // has the person already been there? checks if the event_Attendance is already attended!!
        TimeSpan? event_AttendanceTime = event_Attendance.Time;
        if (event_AttendanceTime != null) return false;

        Event? eventt =  await _context.Event.FirstOrDefaultAsync(e => e.EventId == eventId) ;
        if (eventt == null) return false;
        DateOnly? eventDate = eventt.EventDate;
        TimeSpan startTime = eventt.StartTime;
        TimeSpan endTime = eventt.EndTime;


        //!!! Getting today's date as DateOnly. It has this format 02-10-2024
        //!!!!!! in sqldb DateOnly (eventDate) has this format 2024-10-02
        DateOnly today = DateOnly.FromDateTime(DateTime.Now);
        if (today != eventDate) return false;
        

        // Get the current time as TimeSpan. It has this format 17:12:47.6037312
        TimeSpan currentTime = DateTime.Now.TimeOfDay;
        // Check if the current time is between startTime and endTime
        if (currentTime >= startTime && currentTime < endTime)
        {
            event_Attendance.Time = currentTime;
            return false;
        }

        return false;
    }


    // GetEventAttendancees

    public async Task<List<User?>> GetEventAttendees(int eventId)
    {
        return await _context.Event_Attendance
            .Where(ea => ea.EventId == eventId)
            .Select(ea => ea.User)
            .ToListAsync();
    }

    //DeleteEventAttendance
    public async Task<bool> DeleteEventAttendance(int eventId, int userId)
    {
        var eventAttendance = await _context.Event_Attendance
            .Where(ea => ea.EventId == eventId && ea.UserId == userId)
            .FirstOrDefaultAsync();

        if (eventAttendance == null) return false;

        _context.Event_Attendance.Remove(eventAttendance);
        await _context.SaveChangesAsync();
        return true;
    }



}
