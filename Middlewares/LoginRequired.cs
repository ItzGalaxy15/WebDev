namespace Middleware.LoginRequired;

public class LoginRequiredMiddleware
{
    private readonly RequestDelegate _next;
    public LoginRequiredMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    private HashSet<string> _excludedPaths = new(){"/api/v1/login/login", "api/v1/login/register", 
                    "/api/v1/login/isuserloggedin", "/api/v1/login/isadminloggedin"};
    public async Task InvokeAsync(HttpContext context)
    {
        // If the USER_SESSION_KEY is not set, no one is logged in
        // It doesn't check the endpoints in excludedPaths, because they should be accessable for everyone
        string? userSession = context.Session.GetString("USER_SESSION_KEY");
        if (!_excludedPaths.Contains(context.Request.Path.ToString().ToLower()) && 
            string.IsNullOrWhiteSpace(userSession))
        {
            context.Response.Redirect("login/login", true);
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
