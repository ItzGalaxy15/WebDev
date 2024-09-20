using StarterKit.Models;

namespace StarterKit.Services;

public interface IEventsService {
    public Event[] GetAllEvents();
    public Event? GetEventById(int id);
    public void CreateEvent(Event newEvent);
    
}
