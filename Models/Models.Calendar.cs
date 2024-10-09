using System.Text.Json.Serialization;

namespace StarterKit.Models
{
    public class User
    {
        public int UserId { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Email { get; set; }

        public required string Password { get; set; }

        // A comma sepparated string that could look like this: "mo,tu,we,th,fr"
        public required string RecuringDays { get; set; }

        [JsonIgnore]
        public Attendance? Attendance { get; set; } = null;

        //public required List<Attendance> Attendances { get; set; }

        public List<Event_Attendance>? Event_Attendances { get; set; }
    }

    public class Attendance
    {
        public int AttendanceId { get; set; }

        public DateTime? TimeArrived { get; set; } = null;

        public required int UserId { get; set; }

        [JsonIgnore]
        public User? User { get; set; }

    }

    public class Event_Attendance
    {
        public TimeSpan? Time {get; set; } = null;
        public int Event_AttendanceId { get; set; }

        public required int UserId { get; set; }
        [JsonIgnore]
        public User? User { get; set; } = null;

        public required int EventId { get; set; }
        [JsonIgnore]
        public Event? Event { get; set; } = null;

        public List<Review> Reviews {get; set; } = null!; // Makes it so it doesn't warn for null when .ThenInclude with EF Core
    }

    public record EditEventBody (int EventId, string Title, string Description, DateOnly EventDate,
    TimeSpan StartTime, TimeSpan EndTime, string Location, bool AdminApproval);
    public class Event
    {
        public int EventId { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public DateOnly EventDate { get; set; }

        public TimeSpan StartTime { get; set; }

        public TimeSpan EndTime { get; set; }

        public required string Location { get; set; }

        public required int Capacity { get; set;}

        public bool AdminApproval { get; set; }

        public bool Delete { get; set; } = false;

        // This list is not saved in the database, but is used when getting all events,
        // so all event_attendances can get added to the event when returning.
        public List<Event_Attendance> Event_Attendances { get; set; } = null!;
    }

    public class Review
    {
        public int ReviewId { get; set; }

        public required string Feedback { get; set; }

        public required int Rating { get; set; }

        public required int EventId { get; set; }

        public int Event_AttendanceId { get; set; }

        [JsonIgnore]
        public Event_Attendance? Event_Attendance { get; set; } = null;
    }

    public class Message
    {
        public int MessageId { get; set; }
        public DateTime Date { get; set; }
        public required string Content { get; set; }
        public int ToUserId { get; set; }
        public int FromUserId { get; set; }
        public bool BeenRead { get; set; }
    }
}

