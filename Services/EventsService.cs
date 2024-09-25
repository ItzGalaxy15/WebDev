using Microsoft.AspNetCore.Mvc.Filters;
using StarterKit.Models;
using StarterKit.Utils;

namespace StarterKit.Services;

public class EventsService : IEventsService 
{
    public readonly HashSet<int> ValidRating = new(){0, 1, 2, 3, 4, 5};
    public const char SplitCharacter = '|';

    private readonly DatabaseContext _context;

    public EventsService(DatabaseContext context)
    {
        _context = context;
    }

   public Event[] GetAllEvents()
    {
        // Group all Event_Attendances by their EventId, and then add those groups to the correct Event.Event_Attendances
        var EventAttendancesPerEvent = _context.Event_Attendance.GroupBy(ev_att => ev_att.EventId).ToList();
        List<Event> Events = _context.Event.ToList();
        foreach (var ev in Events)
        {
            ev.Event_Attendances = EventAttendancesPerEvent.FirstOrDefault(gr => gr.Key == ev.EventId)?.ToList() ?? new();
        }
        return Events.ToArray();
    }

    public Event? GetEventById(int id)
    {
        // checks if the given Event_Id indeed exist
        var ev = _context.Event.FirstOrDefault(e => e.EventId == id);
        if (ev != null)
        {
            ev.Event_Attendances = _context.Event_Attendance.Where(ea => ea.EventId == id).ToList();
        }
        return ev;
    }

    public async Task CreateEvent(Event newEvent)
    {
        _context.Event.Add(newEvent);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> CreateEventAttendance(Event_Attendance newEventAttendance)
    {
        // Check if the user and event actually exist
        if (_context.User.Any(user => user.UserId == newEventAttendance.UserId) == false) return false;
        if (_context.Event.Any(_event => _event.EventId == newEventAttendance.EventId) == false) return false;
        
        foreach(Event_Attendance att in _context.Event_Attendance)
        {
            if (att.EventId == newEventAttendance.EventId && att.UserId == newEventAttendance.UserId)
            {
                // Event attendance already exists for the user and the event
                return false;
            }
        }

        // If a review was given, get rid of it
        newEventAttendance.Feedback = "";
        newEventAttendance.Rating = 0;

        _context.Event_Attendance.Add(newEventAttendance);
        await _context.SaveChangesAsync();
        return true;

    }


    public async Task<bool> AddEventFeedback(Event_Attendance eventAttendanceReview)
    {
        // If feedback contains the split character '|' or the rating not a number between 0-5, its invalid
        if (eventAttendanceReview.Feedback.Contains('|') || 
            !ValidRating.Contains(eventAttendanceReview.Rating))

        // Check if the user and event actually exist
        if (_context.User.Any(user => user.UserId == eventAttendanceReview.UserId) == false) return false;
        if (_context.Event.Any(_event => _event.EventId == eventAttendanceReview.EventId) == false) return false;
        
        Event_Attendance? eventAttendance = null;
        foreach(Event_Attendance att in _context.Event_Attendance)
        {
            if (att.EventId == eventAttendanceReview.EventId && att.UserId == eventAttendanceReview.UserId)
            {
                // Event attendance exists for the user and the event
                eventAttendance = att;
            }
        }
        if (eventAttendance is null) return false;

        // If there already is feedback, add the extra feedback, split with the '|' character
        if (eventAttendance.Feedback.Length > 0) eventAttendance.Feedback += $"|{eventAttendanceReview.Feedback}";
        else eventAttendance.Feedback = eventAttendanceReview.Feedback;

        // If a new Rating was given, replace it
        if (eventAttendanceReview.Rating != 0) eventAttendance.Rating = eventAttendanceReview.Rating;

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteEvent(int eventId)
    {
        Console.WriteLine(eventId);
        
        // Instead of removing the event, put the event on disabled, so references to the event wont break
        bool IsDeleted = false;
        foreach (Event ev in _context.Event)
        {
            if (ev.EventId ==  eventId)
            {
                IsDeleted = true;
                ev.Delete = true;
                break;
            }
        }
        await _context.SaveChangesAsync();

        return IsDeleted;
    }


    // Should probably move to a different place
    public bool RequesterIsSession(string? USER_SESSION_KEY, int userID){
        // Check if the userID of the body is the same as the userID of the logged in user
        if (userID == _context.User.FirstOrDefault(user => user.Email == USER_SESSION_KEY)?.UserId)
            return true;
        return false;
    }
}
