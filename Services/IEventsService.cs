using StarterKit.Models;

namespace StarterKit.Services;

public interface IEventsService {
    public Event[] GetAllEvents();
    public bool DeleteEvent(int eventID);
}

