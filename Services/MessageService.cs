using System.Xml;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using StarterKit.Models;
using StarterKit.Utils;

namespace StarterKit.Services;

public class MessageService : IMessageService 
{
    private readonly DatabaseContext _context;

    public MessageService(DatabaseContext context)
    {
        _context = context;
    }

    public async Task<List<Message>> GetMessagesByUserId(int userId)
    {
        return await _context.Message
                        .Where(mes => mes.FromUserId == userId && mes.ToUserId == userId)
                        .ToListAsync();
        
    }

    public async Task<bool> CreateMessage(Message mes, int toId, int currentId)
    {   
        if (!_context.User.Any(u => u.UserId == toId)) return false;

        DateTime now = DateTime.Now;
        DateTime formatedTimeNow = new DateTime(
            now.Year,
            now.Month,
            now.Day,
            now.Hour,
            now.Minute,
            now.Second
            );

        mes.FromUserId = currentId;
        mes.ToUserId = toId;
        mes.Date = formatedTimeNow;
        mes.BeenRead = false;

        _context.Message.Add(mes);
        await _context.SaveChangesAsync();
        return true;
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