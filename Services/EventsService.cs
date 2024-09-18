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
        return _context.Event.ToArray();
    }
}
