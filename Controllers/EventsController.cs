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
    public IActionResult GetEvents()
    {
        return Ok(_eventService.GetAllEvents());
    }

    [HttpGet("{id}")]
    public IActionResult GetEvent(int id)
    {
        var ev = _eventService.GetEventById(id);
        if (ev == null) return NotFound();
        return Ok(ev);
    }

    [HttpPost]
    public IActionResult CreateEvent([FromBody] Event newEvent)
    {
        if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") == null) return Unauthorized("Admin access required");
        _eventService.CreateEvent(newEvent);
        return CreatedAtAction(nameof(GetEvent), new { id = newEvent.EventId }, newEvent);
    }

    [HttpDelete("{eventId}")]
    public IActionResult GetDelete([FromQuery]int eventId)
    {
        if (HttpContext.Session.GetString("ADMIN_SESSION_KEY") == null) return Unauthorized("Admin access required");
        bool deleteEvent = _eventService.DeleteEvent(eventId); // calls a method to check if the given Event_Id indeed exist
        return (deleteEvent) ? Ok("Even has been deleted") : BadRequest("Event not found");
    }
}
