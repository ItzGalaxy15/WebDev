import React, { useState } from "react";

export interface DeleteEventProps {
  backToDashboard: () => void;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ backToDashboard }) => {
  const [eventId, setEventId] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventId(parseInt(e.target.value, 10));
  };

  const handleDelete = async () => {
    if (eventId !== null) {
      const response = await fetch(`/api/v1/Events?eventId=${eventId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Event deleted successfully");
        backToDashboard();
      } else {
        console.error("Failed to delete event");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    setShowConfirmation(false);
    handleDelete();
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  // Inline styles for a teal gradient background + frosted-glass container
  const styles = {
    // Full-screen teal gradient background
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
        "linear-gradient(135deg, rgb(172, 207, 206), rgb(91, 146, 146))",
      fontFamily: "'Poppins', sans-serif",
      color: "#fff",
      position: "relative" as const,
    },
    // Frosted-glass container for the main form
    container: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      borderRadius: "20px",
      padding: "40px",
      width: "400px",
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
    form: {
      width: "100%",
      display: "flex",
      flexDirection: "column" as const,
      gap: "15px",
    },
    label: {
      marginBottom: "5px",
      fontWeight: 600,
      fontSize: "1rem",
      color: "#fff",
    },
    input: {
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      fontSize: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      transition: "all 0.3s ease",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
    },
    buttonRow: {
      display: "flex",
      gap: "10px",
      marginTop: "15px",
      justifyContent: "center",
    },
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
    // Styles for the confirmation popup overlay
    confirmationOverlay: {
      position: "fixed" as const,
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    },
    confirmationContainer: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      borderRadius: "15px",
      padding: "30px",
      width: "300px",
      maxWidth: "90%",
      color: "#fff",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
    },
    confirmationText: {
      marginBottom: "20px",
      textAlign: "center" as const,
      fontSize: "1.1rem",
    },
    confirmationButtonRow: {
      display: "flex",
      gap: "10px",
      width: "100%",
      justifyContent: "center",
    },
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Delete Event</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>Event ID:</label>
            <input
              style={styles.input}
              type="number"
              name="eventId"
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.buttonRow}>
            <button type="submit" style={styles.button}>
              Delete Event
            </button>
            <button
              type="button"
              style={styles.button}
              onClick={backToDashboard}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {showConfirmation && (
        <div style={styles.confirmationOverlay}>
          <div style={styles.confirmationContainer}>
            <p style={styles.confirmationText}>
              Are you sure you want to delete this event?
            </p>
            <div style={styles.confirmationButtonRow}>
              <button style={styles.button} onClick={confirmDelete}>
                Yes
              </button>
              <button style={styles.button} onClick={cancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteEvent;
