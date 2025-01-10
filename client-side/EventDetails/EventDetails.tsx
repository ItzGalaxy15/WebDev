import React from "react";
import { HomeEvent } from "../Home/home.state";
import EventAttendanceForm from "../EventAttendanceForm/EventAttendanceForm";

interface EventDetailsProps {
  event: HomeEvent;
  backToHome: () => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ event, backToHome }) => {
  // Outer container (full-screen gradient)
  const styles = {
    outerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
      fontFamily: "'Poppins', sans-serif",
      // The same diagonal teal gradient background
      background:
        "linear-gradient(135deg, rgb(172, 207, 206) 0%, rgb(91, 146, 146) 100%)",
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
      color: "#fff",
    },
    heading: {
      fontWeight: 600,
      fontSize: "1.8rem",
      marginBottom: "20px",
      borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
      paddingBottom: "10px",
    },
    paragraph: {
      margin: "6px 0",
      lineHeight: 1.5,
    },
    list: {
      listStyleType: "none",
      paddingLeft: 0,
      marginLeft: "20px",
      marginBottom: "20px",
    },
    innerList: {
      listStyleType: "disc",
      marginLeft: "20px",
      marginTop: "5px",
      marginBottom: "5px",
    },
    subHeading: {
      fontWeight: 600,
      fontSize: "1.2rem",
      marginTop: "20px",
      marginBottom: "10px",
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
        "linear-gradient(135deg, rgb(247, 247, 244) 0%, rgb(248, 246, 248) 100%)",
      transition: "background 0.3s ease, transform 0.2s ease",
      textAlign: "center" as const,
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h3 style={styles.heading}>Title: {event.title}</h3>

        <p style={styles.paragraph}>Description: {event.description}</p>
        <p style={styles.paragraph}>Date: {event.eventDate}</p>
        <p style={styles.paragraph}>
          Time: {event.startTime} - {event.endTime}
        </p>
        <p style={styles.paragraph}>Location: {event.location}</p>
        <p style={styles.paragraph}>Capacity: {event.capacity}</p>
        <p style={styles.paragraph}>
          Admin Approval: {event.adminApproval ? "Yes" : "No"}
        </p>
        <p style={styles.paragraph}>Deleted: {event.delete ? "Yes" : "No"}</p>

        <h4 style={styles.subHeading}>Attendances:</h4>
        <ul style={styles.list}>
          {event.event_Attendances?.length ? (
            event.event_Attendances.map((attendance) => (
              <li key={attendance.event_AttendanceId}>
                User: {attendance.userId}
                <ul style={styles.innerList}>
                  {attendance.reviews?.length ? (
                    attendance.reviews.map((review) => (
                      <li key={review.reviewId}>
                        Feedback: {review.feedback}, Rating: {review.rating}
                      </li>
                    ))
                  ) : (
                    <li>No reviews available</li>
                  )}
                </ul>
              </li>
            ))
          ) : (
            <li>No attendances available</li>
          )}
        </ul>

        <EventAttendanceForm
          eventId={event.eventId}
          onSuccess={() => alert("Successfully registered for the event!")}
          onFailure={(error) => alert(error)}
        />

        {/* Back button */}
        <button style={styles.button} onClick={backToHome}>
          Back to home page
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
