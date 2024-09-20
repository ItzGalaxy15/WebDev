using Microsoft.AspNetCore.Mvc;
using StarterKit.Services;

namespace StarterKit.Controllers;

[Route("api/v1/Events")]
public class EventsController : Controller 
{
    private readonly IEventsService _eventService;

    public EventsController(IEventsService eventService)
    {
        _eventService = eventService;
    }

    [HttpGet()]
    public IActionResult GetEvents(){
        return Ok(_eventService.GetAllEvents());
    }

    [HttpDelete("{eventId}")]
    public IActionResult GetDelete([FromQuery]int eventId)
    {
        // if LoginController.IsAdminLoggedIn() == true !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        bool deleteEvent = _eventService.DeleteEvent(eventId); // calls a method to check if the given Event_Id indeed exist
        return (deleteEvent) ? Ok("Even has been deleted") : BadRequest("Event not found");
    }
}
