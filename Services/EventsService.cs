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
        .ThenInclude(evAtt => evAtt.Reviews)
        .AsNoTracking()
        .ToArray()
        );
    }

    public async Task<Event?> GetEventById(int id)
    {
        // checks if the given EventId indeed exist
        var ev = await _context.Event
        .Include(evnt => evnt.Event_Attendances)
        .ThenInclude(evAtt => evAtt.Reviews)
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


    public async Task<(bool, int)> CheckUserAttendedEvent(string? USER_SESSION_KEY, int EventId)
    {
        //with users email checks if it matches the session
        User? uid = await _context.User.FirstOrDefaultAsync(u => u.Email == USER_SESSION_KEY);
        if (uid != null)
        {
            foreach(Event_Attendance att in _context.Event_Attendance)
            {
                //goes through event attendance to check if eventid and user id matches
                if (att.EventId == EventId && att.UserId == uid.UserId)
                {
                    //sends that the correct into has been found along with the attendance id
                    return (true, att.Event_AttendanceId);
                }
            }
            return (false, 0);
        }
        return (false, 0);
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
    public async Task<int?> GetUserId(string? USER_SESSION_KEY){
        return (await _context.User.FirstOrDefaultAsync(user => user.Email == USER_SESSION_KEY))?.UserId;
    }
}
