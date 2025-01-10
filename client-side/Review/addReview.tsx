import React, { useState } from "react";

export interface AddReviewProps {
  backToPreviousScreen: () => void;
  eventId: number;
}

export interface Review {
  Feedback: string;
  Rating: number;
  EventId: number;
}

const AddReview: React.FC<AddReviewProps> = ({ eventId, backToPreviousScreen }) => {
  const [review, setReview] = useState<Review>({
    Feedback: "",
    Rating: 1,
    EventId: eventId,
  });

  const handleChange = (
    r: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = r.target;
    setReview((prev) => ({
      ...prev,
      [name]: name === "Rating" || name === "EventId" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (r: React.FormEvent) => {
    r.preventDefault();
    const response = await fetch("api/v1/AttendEvent/AddReview", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      backToPreviousScreen();
    } else {
      console.error("Failed to add review");
    }
  };

  // Inline styles using your teal gradient & frosted-glass design
  const styles = {
    // Full-screen gradient background
    outerContainer: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      margin: 0,
      background:
        "linear-gradient(135deg, rgb(172, 207, 206) 0%, rgb(91, 146, 146) 100%)",
      fontFamily: "'Poppins', sans-serif",
    },
    // Frosted-glass container
    container: {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
      borderRadius: "20px",
      padding: "40px",
      width: "400px",
      maxWidth: "90%",
      color: "#fff",
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
    },
    form: {
      width: "100%",
    },
    formGroup: {
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column" as const,
    },
    label: {
      marginBottom: "5px",
      fontWeight: 600,
      fontSize: "1rem",
    },
    textArea: {
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      fontSize: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      transition: "all 0.3s ease",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
      minHeight: "70px",
      resize: "vertical" as const,
    },
    select: {
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
      gap: "15px",
      marginTop: "20px",
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
  };

  return (
    <div style={styles.outerContainer}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Add Review</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Feedback:</label>
            <textarea
              name="Feedback"
              value={review.Feedback}
              onChange={handleChange}
              style={styles.textArea}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Rating:</label>
            <select
              name="Rating"
              value={review.Rating}
              onChange={handleChange}
              style={styles.select}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>

          <div style={styles.buttonRow}>
            <button type="submit" style={styles.button}>
              Submit Review
            </button>
            <button
              type="button"
              style={styles.button}
              onClick={backToPreviousScreen}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReview;
