using Microsoft.AspNetCore.Mvc;
using StarterKit.Models;
using StarterKit.Services;

namespace StarterKit.Controllers;

[Route("api/v1/Events")]
public class EventsController : Controller 
{
    private readonly IEventsService _eventService;
    private readonly DatabaseContext _dbContext;

    public EventsController(IEventsService eventService, DatabaseContext dbContext)
    {
        _eventService = eventService;
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<IActionResult> GetEvents()
    {
        if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Log in required");
        return Ok(await _eventService.GetAllEvents());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEvent(int id)
    {
        if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Log in required");
        var ev = await _eventService.GetEventById(id);
        if (ev == null) return NotFound();
        return Ok(ev);
    }

    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] Event newEvent)
    {
        if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") == null) return Unauthorized("Admin access required");
        await _eventService.CreateEvent(newEvent);
        return CreatedAtAction(nameof(GetEvent), new { id = newEvent.EventId }, newEvent);
    }

    // [HttpPut]
    // This method is used to edit an event


    [HttpPost("CreateEventAttendance")]
    public async Task<IActionResult> CreateAttendenceEvent([FromBody] Event_Attendance newAttendance)
    {
        if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Log in required");
        if (! await _eventService.RequesterIsSession(HttpContext.Session.GetString("USER_SESSION_KEY"), newAttendance.UserId)) return Unauthorized("Incorrect user");


        bool check = await _eventService.CreateEventAttendance(newAttendance);

        if (check) return Ok("Event attendance created successfully.");
        else return Conflict("Event attendance already exist");
    }

    [HttpPut("AddReview")]
    public async Task<IActionResult> AddReview([FromBody] Event_Attendance newEventAttendance)
    {
        if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Login required");
        if (! await _eventService.RequesterIsSession(HttpContext.Session.GetString("USER_SESSION_KEY"), newEventAttendance.UserId)) return Unauthorized("Incorrect login");

        bool check = await _eventService.AddEventFeedback(newEventAttendance);
        if (check)
        {
            return Ok("New review added successfully.");
        }
        else
        {
            return BadRequest("Couldn't add feedback.");
        }
    }

    [HttpDelete]
    public async Task<IActionResult> GetDelete([FromQuery] int eventId)
    {
        if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") == null) return Unauthorized("Admin access required");
        bool deleteEvent = await _eventService.DeleteEvent(eventId); // calls a method to check if the given Event_Id indeed exist
        return deleteEvent ? Ok($"Event {eventId} has been deleted") : BadRequest($"Event {eventId} not found");
    }
}
