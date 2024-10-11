using System.Text;
using Microsoft.AspNetCore.Mvc;
using StarterKit.Services;
using StarterKit.Models;
using Microsoft.EntityFrameworkCore;

//User can attend an event
//User can subscribe to an event

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

        // Get the list of attendees
        var attendees = await _attendEventService.GetEventAttendees(eventId);
        return Ok(attendees);
    }


    [HttpPost("CreateEventAttendance")]
    public async Task<IActionResult> CreateAttendenceEvent([FromQuery] int eventId)
    {
        // if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Log in required");
        int? userId = await _eventsService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        // Should not be able to be null
        if (userId == null) return StatusCode(StatusCodes.Status500InternalServerError);

        if (!await _attendEventService.CheckCapacity(eventId)) return BadRequest("Event is full");

        bool check = await _attendEventService.CreateEventAttendance(eventId, (int)userId);

        if (check) return Ok("Event attendance created successfully.");
        else return Conflict("Event attendance already exist");
    }

    [HttpPut("AddReview")]
    public async Task<IActionResult> AddReview([FromBody] Review newReview)
    {
        // if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Login required");
        var (attended, AttId) = await _eventsService.CheckUserAttendedEvent(HttpContext.Session.GetString("USER_SESSION_KEY"), newReview.EventId);
        if(!attended)
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

    [HttpDelete("DeleteAttendance")]
    public async Task<IActionResult> DeleteAttendance([FromQuery] int eventId)
    {
        // if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Login required");
        int? userId = await _eventsService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        // Should not be able to be null
        if (userId == null) return StatusCode(StatusCodes.Status500InternalServerError);

        bool check = await _attendEventService.DeleteEventAttendance(eventId, (int)userId);

        if (check) return Ok("Event attendance deleted successfully.");
        else return NotFound("Event attendance does not exist");
    }


    [HttpPost("SetEventAttendance")]
    public async Task<IActionResult> SetEventAttendance([FromQuery] int eventId)
    {
        bool check = await _attendEventService.SetEventAttendance(HttpContext.Session.GetString("USER_SESSION_KEY")!, eventId);
    
        if (check) return Ok("Event Attendance is successfully set");
        else return BadRequest("Couldn't set Event Attendance.");
    }

}