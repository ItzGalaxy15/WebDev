using Microsoft.AspNetCore.Mvc;
using StarterKit.Models;
using StarterKit.Services;
using Filter.AdminRequired;

namespace StarterKit.Controllers;

[Route("api/v1/Events")]
public class EventsController : Controller 
{
    private readonly IEventsService _eventService;

    public EventsController(IEventsService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet]
    public async Task<IActionResult> GetEvents()
    {
        return Ok(await _eventService.GetAllEvents());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetEvent(int id)
    {
        var ev = await _eventService.GetEventById(id);
        if (ev == null) return NotFound();
        return Ok(ev);
    }

    [AdminRequired]
    [HttpPost]
    public async Task<IActionResult> CreateEvent([FromBody] Event newEvent)
    {
        await _eventService.CreateEvent(newEvent);
        return CreatedAtAction(nameof(GetEvent), new { id = newEvent.EventId }, newEvent);
    }

    [AdminRequired]
    [HttpPut]
    public async Task<IActionResult> EditEvent([FromQuery] string[] changed, [FromBody] EditEventBody editedEventBody)
    {
        bool check = await _eventService.EditEvent(editedEventBody, changed);

        if (check) return Ok("Event has been successfully edited.");
        return BadRequest("Event could not be edited.");
    }

    [AdminRequired]
    [HttpDelete]
    public async Task<IActionResult> Delete([FromQuery] int eventId)
    {
        bool deleteEvent = await _eventService.DeleteEvent(eventId); // calls a method to check if the given Event_Id indeed exist
        return deleteEvent ? Ok($"Event {eventId} has been deleted") : BadRequest($"Event {eventId} not found");
    }
}
