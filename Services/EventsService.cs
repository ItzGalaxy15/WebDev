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

    public async Task<bool> CreateAttendenceEvent(Event_Attendance newAttendance)
    {
        bool alreadyExist = false;
        foreach(Event_Attendance att in _context.Event_Attendance)
        {
            if (att.EventId == newAttendance.EventId && att.UserId == newAttendance.UserId)
            {
                alreadyExist = true;
                break;
            }
        }
        if (!alreadyExist)
        {
            _context.Event_Attendance.Add(newAttendance);
            await _context.SaveChangesAsync();
            return true;
        }
        else
        {
            return false;
        }
    }

    public async Task<bool> DeleteEvent(int eventId)
    {
        Console.WriteLine(eventId);
        
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
