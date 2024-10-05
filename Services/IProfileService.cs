using StarterKit.Controllers;

namespace StarterKit.Services;

public interface IProfileService {
    public Task<bool> ChangeSettings(EditedProfile edited, string USER_SESSION_KEY);
}