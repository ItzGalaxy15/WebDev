import React, { useState } from "react";

export interface AddEventProps {
  backToDashboard: () => void;
}

export interface Event {
  Title: string;
  Description: string;
  EventDate: string;
  StartTime: string;
  EndTime: string;
  Location: string;
  Capacity: number;
}

const AddEvent: React.FC<AddEventProps> = ({ backToDashboard }) => {
  const [event, setEvent] = useState<Event>({
    Title: "",
    Description: "",
    EventDate: "",
    StartTime: "",
    EndTime: "",
    Location: "",
    Capacity: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedEvent = {
      ...event,
      StartTime: `${event.StartTime}:00`, // Convert to hh:mm:ss
      EndTime: `${event.EndTime}:00`,     // Convert to hh:mm:ss
    };
    const response = await fetch("/api/v1/Events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedEvent),
    });

    if (response.ok) {
      backToDashboard();
    } else {
      console.error("Failed to create event");
    }
  };

  const styles = {
    outerContainer: {
      width: "100%",
      minHeight: "100vh",
      margin: 0,
      padding: "40px",
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
    heading: {
      fontWeight: 600,
      fontSize: "1.8rem",
      marginBottom: "20px",
      textAlign: "center" as const,
    },
    form: {
      // We'll keep the table layout for the inputs
      width: "auto",
    },
    table: {
      borderCollapse: "collapse" as const,
    },
    labelCell: {
      whiteSpace: "nowrap" as const,
      textAlign: "right" as const,
      padding: "8px 10px",
      fontWeight: 600,
      width: "1px",
    },
    inputCell: {
      padding: "8px 10px",
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
      width: "200px",
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
      width: "200px",
    },
    buttonRow: {
      display: "flex",
      gap: "15px",
      marginTop: "20px",
      paddingLeft: "8px",
      justifyContent: "center",
    },
    button: {
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
      minWidth: "100px",
    },
  };

  return (
    <div style={styles.outerContainer}>
      <h2 style={styles.heading}>Add New Event</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td style={styles.labelCell}>Title:</td>
              <td style={styles.inputCell}>
                <input
                  style={styles.input}
                  type="text"
                  name="Title"
                  value={event.Title}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={styles.labelCell}>Description:</td>
              <td style={styles.inputCell}>
                <textarea
                  style={styles.textArea}
                  name="Description"
                  value={event.Description}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={styles.labelCell}>Event Date:</td>
              <td style={styles.inputCell}>
                <input
                  style={styles.input}
                  type="date"
                  name="EventDate"
                  value={event.EventDate}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={styles.labelCell}>Start Time:</td>
              <td style={styles.inputCell}>
                <input
                  style={styles.input}
                  type="time"
                  name="StartTime"
                  value={event.StartTime}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={styles.labelCell}>End Time:</td>
              <td style={styles.inputCell}>
                <input
                  style={styles.input}
                  type="time"
                  name="EndTime"
                  value={event.EndTime}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={styles.labelCell}>Location:</td>
              <td style={styles.inputCell}>
                <input
                  style={styles.input}
                  type="text"
                  name="Location"
                  value={event.Location}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td style={styles.labelCell}>Capacity:</td>
              <td style={styles.inputCell}>
                <input
                  style={styles.input}
                  type="number"
                  name="Capacity"
                  value={event.Capacity}
                  onChange={handleChange}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div style={styles.buttonRow}>
          <button type="submit" style={styles.button}>
            Save Event
          </button>
          <button type="button" style={styles.button} onClick={backToDashboard}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
