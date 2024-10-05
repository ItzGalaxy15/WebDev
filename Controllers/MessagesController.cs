using Microsoft.AspNetCore.Mvc;
using StarterKit.Models;
using StarterKit.Services;
using Filter.AdminRequired;

namespace StarterKit.Controllers;

[Route("api/v1/Message")]

public class MessagesController : Controller 
{
    private readonly IMessageService _messageService;

    public MessagesController(IMessageService messageService)
    {
        _messageService = messageService;
    }

    
    [HttpGet]
    public async Task<IActionResult> GetMessage([FromQuery] int uid)
    {
        var mes = await _messageService.GetMessageById(uid);
        if (mes == null) return NotFound("Messages not found.");
        return Ok(mes);
    }

    
    [HttpPut]
    public async Task<IActionResult> UpdateMessageRead([FromQuery] int mid)
    {
        var (check, uid) = await _messageService.CheckLogin(HttpContext.Session.GetString("USER_SESSION_KEY"));
        if (check == false) return Unauthorized("login is required.");

        bool check2 = await _messageService.MessageRead(uid, mid);
        if (check2) return Ok("Message read status has been updated");
        return BadRequest("Message read status has not been updated.");
    }

    
    [HttpPost] //uid = user to send to
    public async Task<IActionResult> PostMessage([FromQuery] int uid, [FromBody] Message mes)
    {
        //checks if the user logged in and the id from message 
        var (check, Current_id) = await _messageService.CheckLogin(HttpContext.Session.GetString("USER_SESSION_KEY"));
        if (check == false) return Unauthorized("login is required.");
        if (Current_id == uid) return Unauthorized("Cant send a message to yourself.");

        await _messageService.CreateMessage(mes, uid, Current_id);
        return Ok("Message has been sent!");

    }
}