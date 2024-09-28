using StarterKit.Models;

namespace StarterKit.Services;

public interface IEventsService {
    public Task<Event[]> GetAllEvents();

    public Task<Event?> GetEventById(int id);

    public Task CreateEvent(Event newEvent);

    public Task<bool> AddReview(Review newReview, int AttId);

    public Task<bool> DeleteEvent(int eventID);

    public Task<bool> CreateEventAttendance(Event_Attendance newAttendance);

    public Task<bool> RequesterIsSession(string? USER_SESSION_KEY, int userID);

    public Task<(bool, int)> CheckIfCorrectUser(string? USER_SESSION_KEY, int AttId);

    public Task<bool> EditEvent(EditEventBody editEventBody, string[] changes);
}

