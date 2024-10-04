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

}

