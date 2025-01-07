using StarterKit.Models;

namespace StarterKit.Services;

public interface IAttendEventService 
{
    // GetEventAttendancees
    Task<bool> AddReview(Review newReview, int AttId);
    Task<bool> CreateEventAttendance(int eventId, int userId);
    Task<List<User?>> GetEventAttendees(int eventId); // New method

    //DeleteEventAttendance
    Task<bool> DeleteEventAttendance(int eventId, int userId);

    //is uer attendee
    Task<bool> IsUserAttendee(int eventId, int userId);

    Task<bool> SetEventAttendance(string USER_SESSION_KEY, int eventId);

    Task<bool> CheckCapacity(int eventId);

    Task<int> CheckUserAttendedEvent(string? USER_SESSION_KEY, int AttId);

    Task<Event[]> GetMyEvents(int userId);
}

