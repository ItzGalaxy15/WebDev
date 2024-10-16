using StarterKit.Models;

namespace StarterKit.Services;

public interface IMessageService {
    public Task<List<Message>> GetMessageById(int id);
    //public Task<(bool,int)> CheckLogin(string? session);
    public Task<bool> CreateMessage(Message mes, int To_id, int Current_id);
    public Task<bool> MessageRead(int uid, int mId);
}
