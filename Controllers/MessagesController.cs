using Microsoft.AspNetCore.Mvc;
using StarterKit.Models;
using StarterKit.Services;
using Filter.AdminRequired;
using Filter.UserRequired;

namespace StarterKit.Controllers;

[Route("api/v1/Message")]

public class MessagesController : Controller 
{
    private readonly IMessageService _messageService;
    private readonly IEventsService _eventService;

    public MessagesController(IMessageService messageService, IEventsService eventService)
    {
        _messageService = messageService;
        _eventService = eventService;
    }

    [UserRequired]
    [HttpGet]
    public async Task<IActionResult> GetMessage()
    {
        var userId = await _eventService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        var mes = await _messageService.GetMessagesByUserId(userId);
        if (mes == null) return NoContent();
        return Ok(mes);
    }

    [UserRequired]
    [HttpPut]
    public async Task<IActionResult> UpdateMessageRead([FromQuery] int mId)
    {
        var uid = await _eventService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        
        bool check = await _messageService.MessageRead(uid, mId);
        if (check) return Ok("Message read status has been updated");
        return BadRequest("Message read status could not be updated.");
    }

    [UserRequired]
    [HttpPost] //uid = user to send to
    public async Task<IActionResult> PostMessage([FromQuery] int SendToUid, [FromBody] Message mes)
    {
        var CurrentUid = await _eventService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        if (CurrentUid == SendToUid) return BadRequest("Cant send a message to yourself.");

        bool success = await _messageService.CreateMessage(mes, SendToUid, CurrentUid);
        return success ? Ok("Message has been sent!") : BadRequest("User doesn't exist");
    }
}