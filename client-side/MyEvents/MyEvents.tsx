import React from "react";
import { initMyEventState, MyEvent, MyEventState } from "./myEvents.state";
import { getMyEvents } from "./myEvents.api";
import MyEventDetails from "../MyEventDetails/MyEventDetails";
import AddReview from "../Review/addReview";
import { unattendMyEvent } from "../UnattendMyEvent/unattendMyEvent.api";
import { Link } from "react-router-dom";
import { isAdmin } from '../Login/login.api';

export interface MyEventProps {
  backToHome: () => void; // user-supplied function that returns to previous page
}

export class MyEvents extends React.Component<MyEventProps, MyEventState> {
  constructor(props: MyEventProps) {
    super(props);
    this.state = {
      ...initMyEventState,
    };
  }

  componentDidMount(): void {
    this.printEvents();
  }

  printEvents = async () => {
    const events: MyEvent[] = await getMyEvents();
    this.setState({ ...this.state, events });
  };

  selectEvent = (eventId: number | null) => {
    this.setState({ ...this.state, selectedEventId: eventId });
    if (eventId !== null) {
      window.history.pushState({}, '', `/eventid=${eventId}`);
    } else {
      window.history.pushState({}, '', '/myevents');
    }
  };

  handleUnattendEvent = async (event: MyEvent) => {
    try {
      await unattendMyEvent(event);
      this.setState((prevState) => ({
        ...prevState,
        events: prevState.events.filter((e) => e.eventId !== event.eventId),
        selectedEventId: null,
        view: "home",
      }));
    } catch (error) {
      console.error("Failed to unattend the event", error);
    }
  };

  leaveReview = (event: MyEvent) => {
    this.setState({ view: "leaveReview", selectedEventId: event.eventId });
  };

  renderEventList = () => {
    const styles = {
      eventList: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
        width: "100%",
        marginBottom: "20px",
      },
      eventListItem: {
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        padding: "15px",
        borderRadius: "8px",
        marginBottom: "10px",
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
        cursor: "pointer",
        transition: "transform 0.2s ease",
      },
      eventListItemHover: {
        transform: "scale(1.02)",
      },
    };

    return (
      <ul style={styles.eventList}>
        {this.state.events.map((event, index) => (
          <li
            key={event.eventId}
            style={styles.eventListItem}
            onClick={() => {
              this.selectEvent(event.eventId);
              // Switch to "myevents" view after selecting
              this.setState((prevState) =>
                prevState.updateViewState("myevents")(prevState)
              );
            }}
          >
            Event {index + 1}: {event.title}
          </li>
        ))}
      </ul>
    );
  };

  render(): JSX.Element {
    const { view, selectedEventId, events } = this.state;
    const selectedEvent = events.find((event) => event.eventId === selectedEventId);

    // Styles consistent with your frosted-glass login page
    const styles = {
      // Full-screen gradient background
      outerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        fontFamily: "'Poppins', sans-serif",
        background:
          "linear-gradient(135deg, rgb(172, 207, 206) 0%, rgb(91, 146, 146) 100%)",
      },
      // Centered frosted-glass container
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
        fontSize: "2rem",
        color: "#fff",
        marginBottom: "30px",
        textAlign: "center" as const,
      },
      button: {
        width: "100%",
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
      paragraph: {
        color: "#fff",
        textAlign: "center" as const,
        marginBottom: "20px",
      },
    };

    if (view === "home") {
      return (
        <div style={styles.outerContainer}>
          <div style={styles.container}>
            <h2 style={styles.heading}>My Events</h2>
            <p style={styles.paragraph}>Here you can see your events</p>
            {this.state.showEvents && !selectedEvent && this.renderEventList()}
            <Link to="/home">
              <button style={styles.button}>
                Back to previous page
              </button>
            </Link>
          </div>
        </div>
      );
    } else if (view === "leaveReview" && selectedEventId !== null) {
      // The "leave review" screen (AddReview)
      // We can re-use the background + container or do a full-screen approach
      return (
        <AddReview
          backToPreviousScreen={() => {
            this.selectEvent(null);
            this.setState(this.state.updateViewState("home"));
          }}
          eventId={selectedEventId}
        />
      );
    } else {
      // "myevents" by default
      if (selectedEvent) {
        return (
          <MyEventDetails
            event={selectedEvent}
            backToHome={() => {
              this.selectEvent(null);
              this.setState(this.state.updateViewState("home"));
            }}
            onUnattend={this.handleUnattendEvent}
            leaveReview={this.leaveReview}
          />
        );
      } else {
        // Fallback if event isn't found
        return (
          <div style={styles.outerContainer}>
            <div style={styles.container}>
              <h2 style={styles.heading}>Event not found</h2>
              <button
                style={styles.button}
                onClick={() => this.setState(this.state.updateViewState("home"))}
              >
                Back to see your events
              </button>
            </div>
          </div>
        );
      }
    }
  }
}
