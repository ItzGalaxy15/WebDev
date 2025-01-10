import React from "react";
import { getAllEvents } from "./admindashboard.api";
import {
  AdminDashBoardState,
  initAdminDashBoardState,
  Event,
} from "./admindashboard.state";
import AddEvent from "./addevent";
import EditEvent from "./editevent";
import DeleteEvent from "./deleteevent";
import EventAttendees from "./eventattendees";
import { Link } from "react-router-dom";

export interface AdminDashBoardProps {
  backToHome: () => void;
}

export class AdminDashBoard extends React.Component<
  AdminDashBoardProps,
  AdminDashBoardState
> {
  constructor(props: AdminDashBoardProps) {
    super(props);
    this.state = initAdminDashBoardState;
  }

  printEvents = async () => {
    const events: Event[] = await getAllEvents();
    this.setState(this.state.updateEvents(events));
  };

  handleEditEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventId = parseInt((e.target as HTMLFormElement).eventId.value, 10);
    this.setState({ view: "editEvent", editEventId: eventId });
  };

  handleDeleteEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const eventId = parseInt((e.target as HTMLFormElement).eventId.value, 10);
    this.setState({ view: "deleteEvent", editEventId: eventId });
  };

  handleViewAttendees = (e: React.FormEvent) => {
    e.preventDefault();
    const eventId = parseInt((e.target as HTMLFormElement).eventId.value, 10);
    this.setState({ view: "viewAttendees", editEventId: eventId });
  };

  render(): JSX.Element {
    // If in sub-views (add/edit/delete/attendees), just render them directly.
    if (this.state.view === "addEvent") {
      return (
        <AddEvent backToDashboard={() => this.setState({ view: "dashboard" })} />
      );
    }

    if (this.state.view === "editEvent" && this.state.editEventId !== null) {
      return (
        <EditEvent
          backToDashboard={() => this.setState({ view: "dashboard" })}
          eventId={this.state.editEventId}
        />
      );
    }

    if (this.state.view === "deleteEvent" && this.state.editEventId !== null) {
      return (
        <DeleteEvent
          backToDashboard={() => this.setState({ view: "dashboard" })}
        />
      );
    }

    if (this.state.view === "viewAttendees" && this.state.editEventId !== null) {
      return (
        <EventAttendees
          backToDashboard={() => this.setState({ view: "dashboard" })}
          eventId={this.state.editEventId}
        />
      );
    }

    // Otherwise, we're in the "dashboard" view
    // We'll style the entire page with a gradient, no box around the content.
    const styles = {
      // Full-screen gradient background
      outerContainer: {
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: "20px",
        boxSizing: "border-box" as const,

        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        // same diagonal gradient as the rest
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
      button: {
        width: "100%",
        maxWidth: "300px",
        padding: "15px",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        marginTop: "15px",
        fontSize: "1rem",
        fontWeight: 600,
        color: "#000",
        background:
          "linear-gradient(135deg, rgb(247, 247, 244) 0%, rgb(248, 246, 248) 100%)",
        transition: "background 0.3s ease, transform 0.2s ease",
        textAlign: "center" as const,
      },
      formInline: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginTop: "15px",
      },
      input: {
        width: "120px",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        outline: "none",
        fontSize: "1rem",
      },
      eventsListWrapper: {
        marginTop: "30px",
        width: "90%",
        maxWidth: "800px",
      },
      eventsList: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
      },
      eventsListItem: {
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        borderRadius: "10px",
        marginBottom: "15px",
        padding: "15px",
        color: "#000",
      },
      eventTitle: {
        fontWeight: 600,
        marginBottom: "5px",
      },
    };

    return (
      <div style={styles.outerContainer}>
        <h2 style={styles.heading}>Welcome to the admin dashboard</h2>

        {/* Buttons & Forms for managing events */}
        <button style={styles.button} onClick={this.printEvents}>
          View all events
        </button>
        <button
          style={styles.button}
          onClick={() => this.setState({ view: "addEvent" })}
        >
          Add new event
        </button>

        {/* Edit Event Form */}
        <form onSubmit={this.handleEditEvent} style={styles.formInline}>
          <input
            style={styles.input}
            type="number"
            name="eventId"
            placeholder="Enter event ID"
            required
          />
          <button type="submit" style={styles.button}>
            Edit event
          </button>
        </form>

        {/* Delete Event Form */}
        <form onSubmit={this.handleDeleteEvent} style={styles.formInline}>
          <input
            style={styles.input}
            type="number"
            name="eventId"
            placeholder="Enter event ID"
            required
          />
          <button type="submit" style={styles.button}>
            Delete event
          </button>
        </form>

        {/* View Attendees Form */}
        <form onSubmit={this.handleViewAttendees} style={styles.formInline}>
          <input
            style={styles.input}
            type="number"
            name="eventId"
            placeholder="Enter event ID"
            required
          />
          <button type="submit" style={styles.button}>
            See event attendees
          </button>
        </form>

        {/* Back to Home */}
        <Link to="/home" style={{ textDecoration: "none", marginTop: "15px" }}>
          <button style={styles.button}>Back</button>
        </Link>

        {/* If user has clicked "View all events" */}
        {this.state.showEvents && (
          <div style={styles.eventsListWrapper}>
            {this.state.events.length > 0 ? (
              <ul style={styles.eventsList}>
                {this.state.events.map((event) => (
                  <li key={event.eventId} style={styles.eventsListItem}>
                    <h3 style={styles.eventTitle}>{event.title}</h3>
                    <p>{event.description}</p>
                    <p>Date: {event.eventDate}</p>
                    <p>
                      Time: {event.startTime} - {event.endTime}
                    </p>
                    <p>Location: {event.location}</p>
                    <p>Capacity: {event.capacity}</p>
                    <p>Admin Approval: {event.adminApproval ? "Yes" : "No"}</p>
                    <p>Deleted: {event.delete ? "Yes" : "No"}</p>
                    <h4>Attendances:</h4>
                    <ul style={{ marginBottom: 0, paddingLeft: "20px" }}>
                      {event.event_Attendances.map((attendance) => (
                        <li key={attendance.event_AttendanceId}>
                          User ID: {attendance.userId}
                          <ul style={{ paddingLeft: "20px" }}>
                            {attendance.reviews.map((review) => (
                              <li key={review.reviewId}>
                                Feedback: {review.feedback}, Rating:{" "}
                                {review.rating}
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ marginTop: "10px" }}>No events available.</p>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default AdminDashBoard;
