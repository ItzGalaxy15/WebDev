using Microsoft.IdentityModel.Tokens;

namespace Middleware.LoginRequired;

public class LoginRequiredMiddleware
{
    private readonly RequestDelegate _next;
    public LoginRequiredMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    // Maybe doesn't work the way its intended, because it checks get requests too (for login/login for example) i think
    private readonly HashSet<string> _excludedPaths = new(){"/api/v1/login", "/api/v1/login/login", 
                    "/api/v1/login/register", "/api/v1/login/isuserloggedin", "/api/v1/login/isadminloggedin"};
    public async Task InvokeAsync(HttpContext context)
    {
        // Is Admin Logged in
        string? adminSession = context.Session.GetString("USER_SESSION_KEY");
        bool IsAdminLogged = adminSession.IsNullOrEmpty()? false : true;

        // If the USER_SESSION_KEY is not set, no one is logged in
        // It doesn't check the endpoints in excludedPaths, because they should be accessable for everyone
        // Is user Logged in
        string? userSession = context.Session.GetString("USER_SESSION_KEY");
        bool IsUserLogged = userSession.IsNullOrEmpty()? false : true;

        if (!_excludedPaths.Contains(context.Request.Path.ToString().ToLower()) && 
            IsAdminLogged == false && IsUserLogged == false)
        {
            // context.Response.Redirect("/api/v1/login", false);
            context.Response.StatusCode = 401;
            context.Response.ContentType = "text/plain";
            byte[] message = System.Text.Encoding.UTF8.GetBytes("Login required");
            await context.Response.Body.WriteAsync(message, 0, message.Length);
            return;
        }

        await _next(context);
    }
}


public static class LoginRequiredMiddlewareExtensions
{
    public static IApplicationBuilder UseLoginRequired(this IApplicationBuilder builder){
        return builder.UseMiddleware<LoginRequiredMiddleware>();
    }
}
