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


            modelBuilder.Entity<User>()
                .HasIndex(p => p.Email).IsUnique();

            var user1 = new User { FirstName = "Max", LastName = "Bretherton", Email = "max@example.com", Password = "secret", 
                    RecuringDays = "12", Attendances = new List<Attendance>(), Event_Attendances = new List<Event_Attendance>()};
            modelBuilder.Entity<User>().HasData(user1);
            var user2 = new User { FirstName = "Amer", LastName = "Alhasoun", Email = "amer@example.com", Password = "secret", 
                    RecuringDays = "12", Attendances = new List<Attendance>(), Event_Attendances = new List<Event_Attendance>()};
            modelBuilder.Entity<User>().HasData(user2);
            var user3 = new User { FirstName = "Aymane", LastName = "Aazouz", Email = "aymene@example.com", Password = "secret", 
                    RecuringDays = "12", Attendances = new List<Attendance>(), Event_Attendances = new List<Event_Attendance>()};
            modelBuilder.Entity<User>().HasData(user3);
            var user4 = new User { FirstName = "Jordy", LastName = "Mahn", Email = "jordy@example.com", Password = "secret", 
                    RecuringDays = "12", Attendances = new List<Attendance>(), Event_Attendances = new List<Event_Attendance>()};
            modelBuilder.Entity<User>().HasData(user4);


            var event1 = new Event { EventId = 1, Title = "Opening", Description = "First event of the year", EventDate = new DateOnly(2024, 09, 01),
                StartTime = new TimeSpan(12, 30, 0), EndTime = new TimeSpan(16, 0, 0), Location = "Hogeschool Rotterdam", AdminApproval = true, Event_Attendances = new List<Event_Attendance>()};
            modelBuilder.Entity<Event>().HasData(event1);

            var attendee1 = new Event_Attendance{ Event_AttendanceId = 1, Rating = 5, Feedback = "This was amazing!", User = user1, Event = event1};
            modelBuilder.Entity<Event_Attendance>()
                .HasData(attendee1);
            var attendee2 = new Event_Attendance{ Event_AttendanceId = 1, Rating = 1, Feedback = "This sucked!", User = user3, Event = event1};
            modelBuilder.Entity<Event_Attendance>()
                .HasData(attendee2);

            event1.Event_Attendances.Add(attendee1);
            event1.Event_Attendances.Add(attendee2);
        }

    }

}
