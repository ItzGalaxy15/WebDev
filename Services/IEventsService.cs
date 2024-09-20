using StarterKit.Models;

namespace StarterKit.Services;

public interface IEventsService {
    public Event[] GetAllEvents();
    public Event? GetEventById(int id);
    public Task CreateEvent(Event newEvent);
    
    public Task<bool> DeleteEvent(int eventID);
}

