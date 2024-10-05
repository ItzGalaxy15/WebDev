using System.Xml;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using StarterKit.Models;
using StarterKit.Utils;

namespace StarterKit.Services;

public class MessageService : IMessageService 
{
    //public readonly HashSet<int> ValidRating = new(){0, 1, 2, 3, 4, 5};
    //public readonly HashSet<string> ValidEventBody = new() {"Title", "Description", "EventDate",
    //"StartTime", "EndTime", "Location", "AdminApproval"};
    //public const char SplitCharacter = '|';

    private readonly DatabaseContext _context;

    public MessageService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<List<Message>> GetMessageById(int id)
    {
        return await _context.Message
                        .Where(mes => mes.FromUserId == id)
                        //.Select(mes => mes.Content)
                        .ToListAsync();
        
    }
    public async Task<(bool, int)> CheckLogin(string? session)
    {
        var u = await _context.User.FirstOrDefaultAsync(user => user.Email == session);
        if (u != null)
        {
            return (true, u.UserId);
        }
        return (false, 0);
    }

    public async Task CreateMessage(Message mes, int To_id, int Current_id)
    {   
        DateTime now = DateTime.Now;
        DateTime formatedTimeNow = new DateTime(
            now.Year,
            now.Month,
            now.Day,
            now.Hour,
            now.Minute,
            now.Second
            );

        mes.FromUserId = Current_id;
        mes.ToUserId = To_id;
        mes.Date = formatedTimeNow;
        mes.BeenRead = false;

        _context.Message.Add(mes);
        await _context.SaveChangesAsync();
    }

    public async Task<bool> MessageRead(int uid, int mid)
    {
        var message = await _context.Message.FirstOrDefaultAsync(m => m.MessageId == mid);
        if (message == null || message.BeenRead || message.ToUserId != uid) return false;
        
        message.BeenRead = true;
        await _context.SaveChangesAsync();
        return true;
    }
}