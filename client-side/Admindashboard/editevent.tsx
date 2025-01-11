import React, { useState, useEffect } from "react";

export interface Event {
  eventId: number;
  Title: string;
  Description: string;
  EventDate: string;
  StartTime: string;
  EndTime: string;
  Location: string;
  Capacity: number;
}

export interface EditEventProps {
  backToDashboard: () => void;
  eventId: number;
}

const EditEvent: React.FC<EditEventProps> = ({ backToDashboard, eventId }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [modifiedFields, setModifiedFields] = useState<Set<keyof Event>>(new Set());

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`/api/v1/Events/${eventId}`);
      if (response.ok) {
        const eventData = await response.json();
        setEvent(eventData);
      } else {
        console.error("Failed to fetch event");
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event) {
      const { name, value } = e.target;
      setEvent({ ...event, [name]: value });
      setModifiedFields((prev) => new Set(prev).add(name as keyof Event));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (event) {
      const formattedEvent: Partial<Event> = { eventId };
      modifiedFields.forEach((field) => {
        if (event[field] !== undefined) {
          (formattedEvent as any)[field] = event[field];
        }
      });

      const queryParams = Array.from(modifiedFields)
        .map((field) => `changed=${field}`)
        .join("&");

      const response = await fetch(`/api/v1/Events?${queryParams}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedEvent),
      });

      if (response.ok) {
        backToDashboard();
      } else {
        console.error("Failed to update event");
      }
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  // Inline styles for the teal gradient + frosted-glass look:
  const styles = {
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
      fontWeight: 600,
      fontSize: "1.8rem",
      marginBottom: "20px",
      borderBottom: "2px solid rgba(255, 255, 255, 0.3)",
      paddingBottom: "10px",
      textAlign: "center" as const,
    },
    form: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "15px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column" as const,
      marginBottom: "10px",
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
    textArea: {
      padding: "12px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      fontSize: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      transition: "all 0.3s ease",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
      minHeight: "80px",
      resize: "vertical" as const,
    },
    buttonGroup: {
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
        <h2 style={styles.heading}>Edit Event</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Title */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Title:</label>
            <input
              style={styles.input}
              type="text"
              name="Title"
              value={event.Title}
              onChange={handleChange}
            />
          </div>

          {/* Description */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <textarea
              style={styles.textArea}
              name="Description"
              value={event.Description}
              onChange={handleChange}
            />
          </div>

          {/* Event Date */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Event Date:</label>
            <input
              style={styles.input}
              type="date"
              name="EventDate"
              value={event.EventDate}
              onChange={handleChange}
            />
          </div>

          {/* Start Time */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Start Time:</label>
            <input
              style={styles.input}
              type="time"
              name="StartTime"
              value={event.StartTime}
              onChange={handleChange}
            />
          </div>

          {/* End Time */}
          <div style={styles.formGroup}>
            <label style={styles.label}>End Time:</label>
            <input
              style={styles.input}
              type="time"
              name="EndTime"
              value={event.EndTime}
              onChange={handleChange}
            />
          </div>

          {/* Location */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Location:</label>
            <input
              style={styles.input}
              type="text"
              name="Location"
              value={event.Location}
              onChange={handleChange}
            />
          </div>

          {/* Capacity */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Capacity:</label>
            <input
              style={styles.input}
              type="number"
              name="Capacity"
              value={event.Capacity}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.button}>
              Save Event
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
    </div>
  );
};

export default EditEvent;
