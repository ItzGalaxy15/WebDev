using Microsoft.EntityFrameworkCore;
using StarterKit.Models;
using StarterKit.Services;

using Middleware.LoginRequired;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http.Extensions;

namespace StarterKit
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllersWithViews();

            builder.Services.AddDistributedMemoryCache();

            builder.Services.AddSession(options => 
            {
                options.IdleTimeout = TimeSpan.FromMinutes(10);
                options.Cookie.HttpOnly = true; 
                options.Cookie.IsEssential = true; 
            });

            builder.Services.AddScoped<ILoginService, LoginService>();
            builder.Services.AddScoped<IEventsService, EventsService>();
            builder.Services.AddScoped<IAttendEventService, AttendEventService>();
            builder.Services.AddScoped<IProfileService, ProfileService>();
            builder.Services.AddScoped<IMessageService, MessageService>();

            builder.Services.Configure<LogFileOptions>(builder.Configuration.GetSection("LogFile"));

            builder.Services.AddDbContext<DatabaseContext>(
                options => options.UseSqlite(builder.Configuration.GetConnectionString("SqlLiteDb")));

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSession();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");


            app.Use(async (context, next) => {
                var logFileOptions = context.RequestServices.GetService<IOptions<LogFileOptions>>()?.Value ??
                    new LogFileOptions { LogPath = "Logs/RequestLogs.txt"};
                if (!File.Exists(logFileOptions.LogPath)) await File.WriteAllTextAsync(logFileOptions.LogPath, "");
                await File.AppendAllTextAsync(logFileOptions.LogPath,
                    $"\n{DateTime.Now} - {context.Connection.RemoteIpAddress} requested {context.Request.Method} {context.Request.GetDisplayUrl()}"
                );

                await next.Invoke();

                await File.AppendAllTextAsync(logFileOptions.LogPath,
                    $"\t | \tResponded with status code: {context.Response.StatusCode}"
                );
            });

            app.UseLoginRequired();

            app.Run("http://localhost:5097");

        }
    }
}
