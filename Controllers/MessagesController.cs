using Microsoft.AspNetCore.Mvc;
using StarterKit.Models;
using StarterKit.Services;
using Filter.AdminRequired;

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


    [HttpGet]
    public async Task<IActionResult> GetMessage([FromQuery] int GetFromUid)
    {
        var CurrentUid = await _eventService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        if (GetFromUid != CurrentUid) return Unauthorized();
        var mes = await _messageService.GetMessageById(GetFromUid);
        if (mes == null) return NotFound("No messages were found.");
        return Ok(mes);
    }

    
    [HttpPut]
    public async Task<IActionResult> UpdateMessageRead([FromQuery] int mid)
    {
        var uid = await _eventService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        
        bool check = await _messageService.MessageRead(uid, mid);
        if (check) return Ok("Message read status has been updated");
        return BadRequest("Message read status has not been updated.");
    }

    
    [HttpPost] //uid = user to send to
    public async Task<IActionResult> PostMessage([FromQuery] int SendToUid, [FromBody] Message mes)
    {
        var CurrentUid = await _eventService.GetUserId(HttpContext.Session.GetString("USER_SESSION_KEY"));
        if (CurrentUid == SendToUid) return Unauthorized("Cant send a message to yourself.");

        await _messageService.CreateMessage(mes, SendToUid, CurrentUid);
        return Ok("Message has been sent!");

    }
}