using Microsoft.AspNetCore.Mvc.Filters;

namespace Filter.AdminRequired;

public class AdminRequired : Attribute, IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext actionContext, ActionExecutionDelegate next)
    {
        var context = actionContext.HttpContext;

        // If the ADMIN_SESSION_KEY doesn't exist, an admin is not logged in
        if (string.IsNullOrEmpty(context.Session.GetString("ADMIN_SESSION_KEY"))){
            context.Response.StatusCode = 401;
            context.Response.ContentType = "text/plain";
            byte[] message = System.Text.Encoding.UTF8.GetBytes("Admin access required");
            await context.Response.Body.WriteAsync(message, 0, message.Length);
            return;
        }

        await next();
    }
}