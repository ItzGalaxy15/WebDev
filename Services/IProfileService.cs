using StarterKit.Controllers;

namespace StarterKit.Services;

public interface IProfileService {
    public Task<ProfilePage?> GetProfilePage(string name, string USER_SESSION_KEY);
    public Task<bool> ChangeSettings(EditedProfile edited, string USER_SESSION_KEY);
    public Task<bool> ArriveToOffice(string USER_SESSION_KEY);
    public Task<bool> LeaveOffice(string USER_SESSION_KEY);
    public Task<ProfileSearch[]> GetProfiles(string search);
    public Task<bool> IsAtOffice(string USER_SESSION_KEY);
}