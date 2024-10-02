using StarterKit.Models;

namespace StarterKit.Services;

public interface IEventsService {
    public Task<Event[]> GetAllEvents();

    public Task<Event?> GetEventById(int id);

    public Task CreateEvent(Event newEvent);

    public Task<bool> DeleteEvent(int eventID);

    public Task<int?> GetUserId(string? USER_SESSION_KEY);

    public Task<(bool, int)> CheckUserAttendedEvent(string? USER_SESSION_KEY, int AttId);

    public Task<bool> EditEvent(EditEventBody editEventBody, string[] changes);
}

