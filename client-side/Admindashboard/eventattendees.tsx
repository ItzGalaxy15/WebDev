import React, { useState, useEffect } from "react";

export interface Attendee {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  recuringDays: string;
}

export interface EventAttendeesProps {
  backToDashboard: () => void;
  eventId: number;
}

const EventAttendees: React.FC<EventAttendeesProps> = ({
  backToDashboard,
  eventId,
}) => {
  const [attendees, setAttendees] = useState<Attendee[] | null>(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      const response = await fetch(
        `/api/v1/AttendEvent/GetEventAttendees?eventId=${eventId}`
      );
      if (response.ok) {
        const data = await response.json();
        setAttendees(data);
      } else {
        console.error("Failed to fetch attendees");
      }
    };

    fetchAttendees();
  }, [eventId]);

  if (!attendees) {
    return <div>Loading...</div>;
  }

  // Inline styles for teal gradient + frosted-glass
  const styles = {
    // Full-screen gradient
    outerContainer: {
      width: "100%",
      minHeight: "100vh",
      margin: 0,
      boxSizing: "border-box" as const,
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      background:
        "linear-gradient(135deg, rgb(172, 207, 206) 0%, rgb(91, 146, 146) 100%)",
      fontFamily: "'Poppins', sans-serif",
      color: "#fff",
    },
    // Frosted-glass container
    container: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      borderRadius: "20px",
      padding: "40px",
      width: "500px",
      maxWidth: "90%",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    },
    heading: {
      fontWeight: 600,
      fontSize: "1.8rem",
      marginBottom: "20px",
      borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
      paddingBottom: "10px",
      textAlign: "center" as const,
      width: "100%",
    },
    list: {
      listStyleType: "none",
      padding: 0,
      margin: 0,
      width: "100%",
      marginTop: "20px",
    },
    listItem: {
      backgroundColor: "rgba(255, 255, 255, 0.25)",
      borderRadius: "10px",
      marginBottom: "15px",
      padding: "15px",
      color: "#000", // Ensure text is readable on the semi-transparent background
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
    },
    attendeeName: {
      fontWeight: 600,
      marginBottom: "5px",
    },
    button: {
      marginTop: "20px",
      padding: "12px",
      borderRadius: "25px",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: 600,
      color: "#000",
      background:
        "linear-gradient(135deg, rgb(247, 247, 244), rgb(248, 246, 248))",
      transition: "background 0.3s ease, transform 0.2s ease",
      textAlign: "center" as const,
      width: "100%", // or 'auto', if you prefer
      maxWidth: "200px",
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Event Attendees</h2>
        <ul style={styles.list}>
          {attendees.length > 0 ? (
            attendees.map((attendee) => (
              <li key={attendee.userId} style={styles.listItem}>
                <p style={styles.attendeeName}>
                  Name: {attendee.firstName} {attendee.lastName}
                </p>
                <p>Email: {attendee.email}</p>
                <p>Recurring Days: {attendee.recuringDays}</p>
              </li>
            ))
          ) : (
            <li style={styles.listItem}>No attendees found</li>
          )}
        </ul>

        <button style={styles.button} onClick={backToDashboard}>
          Back
        </button>
      </div>
    </div>
  );
};

export default EventAttendees;
