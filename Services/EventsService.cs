using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using StarterKit.Models;
using StarterKit.Utils;

namespace StarterKit.Services;

public class EventsService : IEventsService 
{
    public readonly HashSet<int> ValidRating = new(){0, 1, 2, 3, 4, 5};
    public readonly HashSet<string> ValidEventBody = new() {"Title", "Description", "EventDate",
    "StartTime", "EndTime", "Location", "AdminApproval"};
    public const char SplitCharacter = '|';

    private readonly DatabaseContext _context;

    public EventsService(DatabaseContext context)
    {
        _context = context;
    }

   public async Task<Event[]> GetAllEvents()
    {
        return await Task.FromResult(_context.Event
        .Include(evnt => evnt.Event_Attendances)
        .AsNoTracking()
        .ToArray()
        );
    }

    public async Task<Event?> GetEventById(int id)
    {
        // checks if the given EventId indeed exist
        var ev = await _context.Event
        .Include(evnt => evnt.Event_Attendances)
        .AsNoTracking()
        .FirstOrDefaultAsync(e => e.EventId == id);
        
        return ev;
    }

    public async Task CreateEvent(Event newEvent)
    {
        _context.Event.Add(newEvent);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> EditEvent(EditEventBody editEventBody, string[] changes)
    {
        if (changes.Length < 1) return false; // checks if the request has query string (E.G changed = Title)
        foreach(string change in changes)  if (!ValidEventBody.Contains(change)) return false;

        Event? existEvent = await _context.Event.FirstOrDefaultAsync(e => e.EventId == editEventBody.EventId);
        if (existEvent == null) return false;

        foreach(string change in changes)
        {
            switch (change)
            {
                case "Title": existEvent.Title = editEventBody.Title;
                break;
                case "Description": existEvent.Description = editEventBody.Description;
                break;
                case "EventDate": existEvent.EventDate = editEventBody.EventDate;
                break;
                case "StartTime": existEvent.StartTime = editEventBody.StartTime;
                break;
                case "EndTime": existEvent.EndTime = editEventBody.EndTime;
                break;
                case "Location": existEvent.Location = editEventBody.Location;
                break;
                case "AdminApproval": existEvent.AdminApproval = editEventBody.AdminApproval;
                break;
            }
        }
        await _context.SaveChangesAsync();
        return true;
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
    public async Task<bool> RequesterIsSession(string? USER_SESSION_KEY, int userID){
        // Check if the userID of the body is the same as the userID of the logged in user
        if (userID == (await _context.User.FirstOrDefaultAsync(user => user.Email == USER_SESSION_KEY))?.UserId)
            return true;
        return false;
    }
}
