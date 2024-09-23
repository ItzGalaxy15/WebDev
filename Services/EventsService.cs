using Microsoft.AspNetCore.Mvc.Filters;
using StarterKit.Models;
using StarterKit.Utils;

namespace StarterKit.Services;

public class EventsService : IEventsService 
{

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

    public async Task<bool> AddEventFeedback(Event_Attendance newEventAttendance)
    {
        // Check if the user and event actually exist
        if (_context.User.Any(user => user.UserId == newEventAttendance.UserId) == false) return false;
        if (_context.Event.Any(_event => _event.EventId == newEventAttendance.EventId) == false) return false;
        
        _context.Event_Attendance.Add(newEventAttendance);
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
}
