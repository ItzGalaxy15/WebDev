import React from "react";
import { MyEvent } from "../MyEvents/myEvents.state";

interface MyEventDetailsProps {
  event: MyEvent;
  backToHome: () => void;
  onUnattend: (event: MyEvent) => void;
  leaveReview: (event: MyEvent) => void;
}

const MyEventDetails: React.FC<MyEventDetailsProps> = ({
  event,
  backToHome,
  onUnattend,
  leaveReview,
}) => {
  // Page-wide teal gradient background + frosted-glass container
  const styles = {
    // Full-screen teal gradient
    outerContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
      fontFamily: "'Poppins', sans-serif",
      background:
        "linear-gradient(135deg, rgb(172, 207, 206) 0%, rgb(91, 146, 146) 100%)",
      color: "#fff",
    },
    // Frosted-glass card in the center
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
    },
    heading: {
      fontSize: "1.8rem",
      fontWeight: 600,
      marginBottom: "20px",
      borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
      paddingBottom: "10px",
    },
    paragraph: {
      margin: "5px 0",
      lineHeight: 1.5,
    },
    subHeading: {
      fontSize: "1.2rem",
      fontWeight: 600,
      marginTop: "20px",
      marginBottom: "10px",
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
    buttonGroup: {
      marginTop: "20px",
      display: "flex",
      gap: "10px",
    },
    // Same pill-shaped gradient buttons
    button: {
      flex: 1,
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
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h3 style={styles.heading}>{event.title}</h3>

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
                User ID: {attendance.userId}
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

        <div style={styles.buttonGroup}>
          <button style={styles.button} onClick={() => onUnattend(event)}>
            Unattend Event
          </button>
          <button style={styles.button} onClick={() => leaveReview(event)}>
            Leave Review
          </button>
          <button style={styles.button} onClick={backToHome}>
            Back to home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyEventDetails;
