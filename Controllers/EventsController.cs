using Microsoft.AspNetCore.Mvc;
using StarterKit.Services;

namespace StarterKit.Controllers;

[Route("api/v1/Events")]
public class EventsController : Controller 
{

    private readonly IEventsService _eventService;

    public EventsController(IEventsService eventService){
        _eventService = eventService;
    }

    [HttpGet()]
    public IActionResult GetEvents(){
        return Ok(_eventService.GetAllEvents());
    }
}
