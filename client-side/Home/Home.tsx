import React from "react";
import { HomeEvent, HomeState, initHomeState } from "./home.state";
import { AdminDashBoard } from "../Admindashboard/admindashboard";
import { getAllEvents } from "./home.api";
import EventDetails from "../EventDetails/EventDetails";
import { MyEvents } from "../MyEvents/MyEvents";
import { ArriveToOffice, IsAtOffice, LeaveOffice } from "../Profile/profile.api";
import { Link, Navigate } from "react-router-dom";
import { logout, isAdmin } from '../Login/login.api';

export interface HomeProps {
  backToMainHome: () => void;
  IsAdmin: boolean;
}

export class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      ...initHomeState,
    };
  }

  async componentDidMount() {
    await this.printEvents();
    await this.updateAttendanceStatus();
  }

  printEvents = async () => {
    const events: HomeEvent[] = await getAllEvents();
    this.setState({ ...this.state, events });
  };

  updateAttendanceStatus = async () => {
    const response = await IsAtOffice();
    this.setState({ isAtOffice: response });
  };

  handleAttendanceToggle = async () => {
    if (this.state.isAtOffice) {
      await LeaveOffice();
    } else {
      await ArriveToOffice();
    }
    await this.updateAttendanceStatus();
  };

  selectEvent = (eventId: number | null) => {
    this.setState({ ...this.state, selectedEventId: eventId });
    if (eventId !== null) {
      window.history.pushState({}, '', `/eventid=${eventId}`);
    } else {
      window.history.pushState({}, '', '/home');
    }
  };

  handleLogout = async () => {
    await logout();
    this.props.backToMainHome();
  };

  handleAdminDashboardClick = async () => {
    const isAdminLoggedIn = await isAdmin();
    if (isAdminLoggedIn) {
      this.setState(this.state.updateViewState("admindashboard"));
    } else {
      alert("Access Denied: Admins only");
    }
  };

  renderEventList = () => {
    const styles = {
      eventList: {
        listStyleType: "none",
        padding: 0,
        margin: 0,
        marginBottom: "20px",
        width: "100%",
        maxWidth: "400px",
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
    };

    return (
      <ul style={styles.eventList}>
        {this.state.events.map((event, index) => (
          <li
            key={event.eventId}
            style={styles.eventListItem}
            onClick={() => {
              this.selectEvent(event.eventId);
              this.setState(this.state.updateViewState("eventdetails"));
            }}
          >
            Event {index + 1}: {event.title}
          </li>
        ))}
      </ul>
    );
  };

  render(): JSX.Element {
    const { view, selectedEventId } = this.state;
    const selectedEvent = this.state.events.find(
      (event) => event.eventId === selectedEventId
    );

    // 1. A full-screen gradient for the entire page.
    // 2. A content wrapper that centers everything vertically and horizontally.
    const styles = {
      outerContainer: {
        // Make the gradient fill the screen
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        boxSizing: "border-box" as const,

        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center",
        alignItems: "center",

        // Same diagonal gradient from your login
        background:
          "linear-gradient(135deg, rgb(172, 207, 206) 0%, rgb(91, 146, 146) 100%)",
        fontFamily: "'Poppins', sans-serif",
      },
      // We can use a wrapper if we want a max-width for the content
      contentWrapper: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        width: "90%",
        maxWidth: "500px",
        textAlign: "center" as const,
      },
      heading: {
        fontWeight: 600,
        fontSize: "2rem",
        color: "#fff",
        marginBottom: "30px",
      },
      button: {
        width: "100%",
        maxWidth: "400px",
        padding: "15px",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        marginTop: "15px",
        fontSize: "1rem",
        fontWeight: 600,
        color: "black",
        background:
          "linear-gradient(135deg, rgb(247, 247, 244) 0%, rgb(248, 246, 248) 100%)",
        transition: "background 0.3s ease, transform 0.2s ease",
      },
      subHeading: {
        fontWeight: 600,
        fontSize: "1.4rem",
        color: "#fff",
        marginBottom: "20px",
      },
      paragraph: {
        color: "#fff",
        marginBottom: "20px",
      },
    };

    // HOME VIEW
    if (view === "home") {
      return (
        <div style={styles.outerContainer}>
          <div style={styles.contentWrapper}>
            <h1 style={styles.heading}>Welcome to our Home Page</h1>

            {/* Optional event list */}
            {this.state.showEvents && !selectedEvent && this.renderEventList()}

            {/* Attendance toggle */}
            <button style={styles.button} onClick={this.handleAttendanceToggle}>
              {this.state.isAtOffice ? "Leave Office" : "Arrive to Office"}
            </button>

            {/* Admin Dashboard */}
            {this.props.IsAdmin && (
              <button style={styles.button} onClick={this.handleAdminDashboardClick}>
                Admin Dashboard
              </button>
            )}

            {/* My Events */}
            <Link to="/myevents">
              <button style={styles.button}>
                My Events
              </button>
            </Link>

            {/* Log out */}
            <Link to="/" onClick={this.handleLogout}>
              <button style={styles.button}>
                Log out
              </button>
            </Link>
          </div>
        </div>
      );
    }
    // ADMIN DASHBOARD VIEW
    else if (view === "admindashboard") {
      if (this.props.IsAdmin) {
        return <Navigate to="/admindashboard" />;
      } else {
        return (
          <div style={styles.outerContainer}>
            <div style={styles.contentWrapper}>
              <h2 style={styles.subHeading}>Access Denied</h2>
              <p style={styles.paragraph}>Admins only</p>
              <button
                style={styles.button}
                onClick={() => this.setState(this.state.updateViewState("home"))}
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      }
    }
    // EVENT DETAILS VIEW
    else if (view === "eventdetails") {
      if (selectedEvent) {
        return (
          <EventDetails
            event={selectedEvent}
            backToHome={() => {
              this.selectEvent(null);
              this.setState(this.state.updateViewState("home"));
            }}
          />
        );
      } else {
        return (
          <div style={styles.outerContainer}>
            <div style={styles.contentWrapper}>
              <h2 style={styles.subHeading}>Event not found</h2>
              <button
                style={styles.button}
                onClick={() => this.setState(this.state.updateViewState("home"))}
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      }
    }
    // MY EVENTS VIEW
    else {
      return (
        <MyEvents
          backToHome={() => this.setState(this.state.updateViewState("home"))}
        />
      );
    }
  }
}

export default Home;
