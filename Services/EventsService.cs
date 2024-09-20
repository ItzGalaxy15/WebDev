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

    public Event[] GetAllEvents(){
        // Group all Event_Attendances together by their EventId
        var EventAttendancesPerEvent = _context.Event_Attendance.GroupBy(ev_att => ev_att.EventId).ToList();

        // Connect the correct group based on the EventId, if there aren't any, then it should be an empty list
        List<Event> Events = _context.Event.ToList();
        foreach (var ev in Events){
            ev.Event_Attendances = EventAttendancesPerEvent.FirstOrDefault(gr => gr.Key == ev.EventId)?.ToList() ?? new();
        }

        // var AllEvents = Events.ToList().Select
        //     (
        //         ev => {
        //             // Connect the correct group based on the EventId, if there aren't any, then it should be an empty list
        //             ev.Event_Attendances = EventAttendancesPerEvent.FirstOrDefault(gr => gr.Key == ev.EventId)?.ToList() ?? new();
        //             return ev;
        //         }
        //     ).ToList();

        return Events.ToArray();
    }
    
    // checks if the given Event_Id indeed exist
    public bool DeleteEvent(int eventId)
    {
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
        return IsDeleted;
    }
}
