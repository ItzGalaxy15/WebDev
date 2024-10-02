using Microsoft.AspNetCore.Mvc;
using StarterKit.Models;
using StarterKit.Services;
using Filter.AdminRequired;

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
        // if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Log in required");
        return Ok(await _eventService.GetAllEvents());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEvent(int id)
    {
        // if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Log in required");
        var ev = await _eventService.GetEventById(id);
        if (ev == null) return NotFound();
        return Ok(ev);
    }

    [AdminRequired]
    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] Event newEvent)
    {
        // if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") == null) return Unauthorized("Admin access required");
        await _eventService.CreateEvent(newEvent);
        return CreatedAtAction(nameof(GetEvent), new { id = newEvent.EventId }, newEvent);
    }

    [AdminRequired]
    [HttpPut]
    public async Task<IActionResult> EditEvent([FromQuery] string[] changed, [FromBody] EditEventBody editedEventBody)
    {
        // if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") == null) return Unauthorized("Admin access required");
        bool check = await _eventService.EditEvent(editedEventBody, changed);

        if (check) return Ok("Event has been successfully edited.");
        return BadRequest("Couldn't edited the Event.");
    }

    


    [HttpPost("CreateEventAttendance")]
    public async Task<IActionResult> CreateAttendenceEvent([FromQuery] int eventId)
    {
        // if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Log in required");
        int? userId = await _eventService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        // Should not be able to be null
        if (userId == null) return StatusCode(StatusCodes.Status500InternalServerError);

        bool check = await _eventService.CreateEventAttendance(eventId, (int)userId);

        if (check) return Ok("Event attendance created successfully.");
        else return Conflict("Event attendance already exist");
    }

    [HttpPut("AddReview")]
    public async Task<IActionResult> AddReview([FromBody] Review newReview)
    {
        // if (HttpContext.Session.GetString("USER_SESSION_KEY") == null) return Unauthorized("Login required");
        var (attended, AttId) = await _eventService.CheckUserAttendedEvent(HttpContext.Session.GetString("USER_SESSION_KEY"), newReview.EventId);
        if(!attended)
        {
            return Unauthorized("You didn't attend this event.");
        }

        bool check = await _eventService.AddReview(newReview, AttId);
        if (check)
        {
            return Ok("New review added successfully.");
        }
        else
        {
            return BadRequest("Couldn't add feedback.");
        }
    }

    [AdminRequired]
    [HttpDelete]
    public async Task<IActionResult> GetDelete([FromQuery] int eventId)
    {
        // if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") == null) return Unauthorized("Admin access required");
        bool deleteEvent = await _eventService.DeleteEvent(eventId); // calls a method to check if the given Event_Id indeed exist
        return deleteEvent ? Ok($"Event {eventId} has been deleted") : BadRequest($"Event {eventId} not found");
    }
}
