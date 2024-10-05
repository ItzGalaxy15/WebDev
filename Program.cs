using Microsoft.EntityFrameworkCore;
using StarterKit.Models;
using StarterKit.Services;

using  Middleware.LoginRequired;

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
                options.IdleTimeout = TimeSpan.FromMinutes(1);
                options.Cookie.HttpOnly = true; 
                options.Cookie.IsEssential = true; 
            });

            builder.Services.AddScoped<ILoginService, LoginService>();
            builder.Services.AddScoped<IEventsService, EventsService>();
            builder.Services.AddScoped<IAttendEventService, AttendEventService>();
            builder.Services.AddScoped<IProfileService, ProfileService>();
            builder.Services.AddScoped<IMessageService, MessageService>();

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

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSession();


            app.UseLoginRequired();
            // app.Use(async (context, next) => {
            //     await next.Invoke();
            //     Console.WriteLine(context.Request.Path);
            // });

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();

        }
    }
}