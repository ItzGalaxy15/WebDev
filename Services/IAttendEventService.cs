using StarterKit.Models;

namespace StarterKit.Services;

public interface IAttendEventService {

public Task<bool> AddReview(Review newReview, int AttId);
public Task<bool> CreateEventAttendance(int eventId, int userId);

// GetEventAttendancees

}

