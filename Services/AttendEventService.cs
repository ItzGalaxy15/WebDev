using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using StarterKit.Models;
using StarterKit.Utils;

namespace StarterKit.Services;

public class AttendEventService : IAttendEventService 
{
    private readonly DatabaseContext _context;
     public readonly HashSet<int> ValidRating = new(){0, 1, 2, 3, 4, 5};
    public AttendEventService(DatabaseContext context)
    {
        _context = context;
    }
    public async Task<bool> CreateEventAttendance(int eventId, int userId)
    {
        // Check if the user and event actually exist
        //if (_context.User.Any(user => user.UserId == newEventAttendance.UserId) == false) return false;
        if (_context.Event.Any(_event => _event.EventId == eventId) == false) return false;
        
        // if the Event_Attendance already exists
        if (await _context.Event_Attendance.AnyAsync(evAtt => evAtt.EventId == eventId && evAtt.UserId == userId)) return false;

        _context.Event_Attendance.Add(new Event_Attendance { EventId = eventId, UserId = userId} );
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> AddReview(Review newReview, int AttId)
    {
        // the rating not a number between 0-5, its invalid
        if (!ValidRating.Contains(newReview.Rating))
        {
            return false;
        }
        //adding Event_AttendanceId for the foreignkeys
        newReview.Event_AttendanceId = AttId;
        
        _context.Review.Add(newReview);
        await _context.SaveChangesAsync();
        return true;
    }


    // GetEventAttendancees

}
