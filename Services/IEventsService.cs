using StarterKit.Models;

namespace StarterKit.Services;

public interface IEventsService {
    public Task<Event[]> GetAllEvents();

    public Task<Event?> GetEventById(int id);

    public Task CreateEvent(Event newEvent);

    public Task<bool> AddEventFeedback(Event_Attendance newAttendance);

    public Task<bool> DeleteEvent(int eventID);

    public Task<bool> CreateEventAttendance(Event_Attendance newAttendance);

    public Task<bool> RequesterIsSession(string? USER_SESSION_KEY, int userID);
}

