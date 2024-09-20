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
        var ev = _context.Event.FirstOrDefault(e => e.EventId == id);
        if (ev != null)
        {
            ev.Event_Attendances = _context.Event_Attendance.Where(ea => ea.EventId == id).ToList();
        }
        return ev;
    }

    public void CreateEvent(Event newEvent)
    {
        _context.Event.Add(newEvent);
        _context.SaveChanges();
    }
}
