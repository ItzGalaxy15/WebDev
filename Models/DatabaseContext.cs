using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using StarterKit.Utils;

namespace StarterKit.Models
{
    public class DatabaseContext : DbContext
    {
        // The admin table will be used in both cases
        public DbSet<Admin> Admin { get; set; }

        // You can comment out or remove the case you are not going to use.

        // Tables for the event calendar case

        public DbSet<User> User { get; set; }
        public DbSet<Attendance> Attendance { get; set; }
        public DbSet<Event_Attendance> Event_Attendance { get; set; }
        public DbSet<Event> Event { get; set; }
        public DbSet<Review> Review { get; set; }



        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Admin>()
                .HasIndex(p => p.UserName).IsUnique();

            modelBuilder.Entity<Admin>()
                .HasData(new Admin { AdminId = 1, Email = "admin1@example.com", UserName = "admin1", Password = EncryptionHelper.EncryptPassword("password") });
            modelBuilder.Entity<Admin>()
                .HasData(new Admin { AdminId = 2, Email = "admin2@example.com", UserName = "admin2", Password = EncryptionHelper.EncryptPassword("tooeasytooguess") });
            modelBuilder.Entity<Admin>()
                .HasData(new Admin { AdminId = 3, Email = "admin3@example.com", UserName = "admin3", Password = EncryptionHelper.EncryptPassword("helloworld") });
            modelBuilder.Entity<Admin>()
                .HasData(new Admin { AdminId = 4, Email = "admin4@example.com", UserName = "admin4", Password = EncryptionHelper.EncryptPassword("Welcome123") });
            modelBuilder.Entity<Admin>()
                .HasData(new Admin { AdminId = 5, Email = "admin5@example.com", UserName = "admin5", Password = EncryptionHelper.EncryptPassword("Whatisapassword?") });


            modelBuilder.Entity<Event>()
                .HasIndex(e => e.EventId).IsUnique();
            modelBuilder.Entity<Event>()
                .HasMany(e => e.Event_Attendances)
                .WithOne(e => e.Event)
                .HasForeignKey(e => e.EventId)
                .IsRequired();
        
        
            modelBuilder.Entity<Event>()
                .HasData(new Event { EventId = 1, Title = "Opening", Description = "First day", EventDate = new DateOnly(2024, 9, 2),
                StartTime = new TimeSpan(10, 30, 0), EndTime = new TimeSpan(15, 0, 0), Location = "Hogeschool Rotterdam", AdminApproval = true, Event_Attendances = new() });
            modelBuilder.Entity<Event>()
                .HasData(new Event { EventId = 2, Title = "Final", Description = "Last day", EventDate = new DateOnly(2025, 6, 30),
                StartTime = new TimeSpan(11, 0, 0), EndTime = new TimeSpan(12, 0, 0), Location = "Hogeschool Rotterdam", AdminApproval = true, Event_Attendances = new() });


            modelBuilder.Entity<User>()
                .HasIndex(u => u.UserId).IsUnique();
            modelBuilder.Entity<User>()
                .HasMany(e => e.Event_Attendances)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.UserId)
                .IsRequired();
            
            var user1 = new User { UserId = 1, FirstName = "Max", LastName = "Bretherton", Email = "max@example.com", Password = EncryptionHelper.EncryptPassword("secret"), RecuringDays = "mo,tu,we"};
            modelBuilder.Entity<User>().HasData(user1);
            
            var user2 = new User { UserId = 2, FirstName = "Amer", LastName = "Alhasoun", Email = "amer@example.com", Password = EncryptionHelper.EncryptPassword("secret"), RecuringDays = "we,th,fr"};
            modelBuilder.Entity<User>().HasData(user2);
            
            var user3 = new User { UserId = 3, FirstName = "Aymane", LastName = "Aazouz", Email = "aymane@example.com", Password = EncryptionHelper.EncryptPassword("secret"), RecuringDays = "mo,we,fr"};
            modelBuilder.Entity<User>().HasData(user3);
           
            var user4 = new User { UserId = 4, FirstName = "Jordy", LastName = "Mahn", Email = "jordy@example.com", Password = EncryptionHelper.EncryptPassword("secret"), RecuringDays = "tu,we,th"};
            modelBuilder.Entity<User>().HasData(user4);


            modelBuilder.Entity<Event_Attendance>()
                .HasIndex(ea => ea.Event_AttendanceId).IsUnique();
            modelBuilder.Entity<Event_Attendance>()
                .HasMany(e => e.Reviews)
                .WithOne(e => e.Event_Attendance)
                .HasForeignKey(e => e.Event_AttendanceId)
                .IsRequired();

            
            modelBuilder.Entity<Event_Attendance>()
                .HasData(new Event_Attendance { Event_AttendanceId = 1, UserId = 1, EventId = 1});
            modelBuilder.Entity<Event_Attendance>()
                .HasData(new Event_Attendance { Event_AttendanceId = 2, UserId = 1, EventId = 2});
            modelBuilder.Entity<Event_Attendance>()
                .HasData(new Event_Attendance { Event_AttendanceId = 3, UserId = 2, EventId = 1});
            modelBuilder.Entity<Event_Attendance>()
                .HasData(new Event_Attendance { Event_AttendanceId = 4, UserId = 3, EventId = 1});
            modelBuilder.Entity<Event_Attendance>()
                .HasData(new Event_Attendance { Event_AttendanceId = 5, UserId = 3, EventId = 2});
            modelBuilder.Entity<Event_Attendance>()
                .HasData(new Event_Attendance { Event_AttendanceId = 6, UserId = 4, EventId = 2});


            modelBuilder.Entity<Review>()
                .HasIndex(r => r.ReviewId).IsUnique();
            modelBuilder.Entity<Review>()
                .HasData(new Review { ReviewId = 1, Rating = 3, Feedback = "It was decent", Event_AttendanceId = 1});
            modelBuilder.Entity<Review>()
                .HasData(new Review { ReviewId = 2, Rating = 5, Feedback = "It was awesome", Event_AttendanceId = 3});
        }
        
    }

}
