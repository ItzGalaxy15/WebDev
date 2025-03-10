using System.Text;
using Microsoft.AspNetCore.Mvc;
using StarterKit.Services;
using StarterKit.Models;
using Filter.UserRequired;
using Microsoft.EntityFrameworkCore;

[Route("api/v1/AttendEvent")]
public class AttendEventController : Controller 
{
    private readonly IAttendEventService _attendEventService;
    private readonly IEventsService _eventsService;

    public AttendEventController( IEventsService eventsService, IAttendEventService attendEventService)
    {
        _eventsService = eventsService;
        _attendEventService = attendEventService;
    }

    [HttpGet("GetEventAttendees")]
    public async Task<IActionResult> GetEventAttendees([FromQuery] int eventId)
    {
        if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") == null){
            // Get the user ID from the session
            int? userId = await _eventsService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
            if (userId == null)
            {
                return Unauthorized("User not found");
            }

            // Check if the user is an attendee of the event
            bool isAttendee = await _attendEventService.IsUserAttendee(userId.Value, eventId);
            if (!isAttendee)
            {
                return Unauthorized("User is not an attendee of this event");
            }
        }

        // Get the list of event attendees
        var attendees = await _attendEventService.GetEventAttendees(eventId);
        return Ok(attendees);
    }

    [UserRequired]
    [HttpPost("CreateEventAttendance")]
    public async Task<IActionResult> CreateAttendenceEvent([FromQuery] int eventId)
    {
        int? userId = await _eventsService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        if (userId == null) return Unauthorized("User not found");

        if (!await _attendEventService.CheckCapacity(eventId)) return BadRequest("Event is full or not found");

        bool check = await _attendEventService.CreateEventAttendance(eventId, (int)userId);

        if (check) return Ok(new { message = "Event attendance created successfully." });
        else return Conflict(new { message = "Event attendance already exist" });
    }

    [UserRequired]
    [HttpPut("AddReview")]
    public async Task<IActionResult> AddReview([FromBody] Review newReview)
    {
        var AttId = await _attendEventService.CheckUserAttendedEvent(HttpContext.Session.GetString("USER_SESSION_KEY"), newReview.EventId);
        if(AttId == -1)
        {
            return Unauthorized("You didn't attend this event.");
        }

        bool check = await _attendEventService.AddReview(newReview, AttId);
        if (check)
        {
            return Ok("New review added successfully.");
        }
        else
        {
            return BadRequest("Couldn't add feedback.");
        }
    }

    [UserRequired]
    [HttpDelete("DeleteEventAttendance")]
    public async Task<IActionResult> DeleteEventAttendance([FromQuery] int eventId)
    {
        int? userId = await _eventsService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        if (userId == null) return Unauthorized("User not found");

        bool check = await _attendEventService.DeleteEventAttendance(eventId, (int)userId);

        if (check) return Ok(new { message = "Event attendance deleted successfully." });
        else return NotFound(new { message = "Event attendance does not exist" });
    }

    [UserRequired]
    [HttpPost("SetEventAttendance")]
    public async Task<IActionResult> SetEventAttendance([FromQuery] int eventId)
    {
        bool check = await _attendEventService.SetEventAttendance(HttpContext.Session.GetString("USER_SESSION_KEY")!, eventId);
    
        if (check) return Ok("Event Attendance is successfully set");
        else return BadRequest("Couldn't set Event Attendance.");
    }


    [UserRequired]
    [HttpGet("MyEvents")]
    public async Task<IActionResult> GetMyEvents()
    {
        int? userId = await _eventsService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        if (userId == null) return Unauthorized("User not found");

        Event[] futureEvents = await _attendEventService.GetMyEvents((int)userId);
        return Ok(futureEvents);
    }

}