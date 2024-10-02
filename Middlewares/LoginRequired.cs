namespace Middleware.LoginRequired;

public class LoginRequiredMiddleware
{
    private readonly RequestDelegate _next;
    public LoginRequiredMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        string? userSession = context.Session.GetString("USER_SESSION_KEY");
        if (context.Request.Path != "/api/v1/login/login" &&
            context.Request.Path != "/api/v1/login/register" && 
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
