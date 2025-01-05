import React from "react";
import { HomeEvent, HomeState, initHomeState } from './home.state';
import { RegistrationForm } from "../registration/registration";
import { OverviewPage } from "../Overview/overview";
import { AdminDashBoard } from "../Admindashboard/admindashboard";
import Login from "../Login/Login"; // Import the Login component
import { getAllEvents } from "./home.api";



export interface HomeProps {
  backToMainHome: () => void;
  IsAdmin: boolean;
}


export class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = initHomeState;
  }

  printEvents = async () => {
    const events: HomeEvent[] = await getAllEvents();
    this.setState(this.state.getEvents(events));
  };

  componentDidMount(): void {
    this.printEvents()
}
  // setAdminStatus = (status: boolean) => {
  //   this.setState({ isAdmin: status });
  // };

  render(): JSX.Element {
    if (this.state.view === "home") {
      return (
        <div>
          Welcome to our home page
          <div>
          {this.state.showEvents ? (
              this.state.events.length > 0 ? (
                <ul>
                  {this.state.events.map(event => (
                    <li key={event.eventId}>
                      <h3>{event.title}</h3>
                      <p>{event.description}</p>
                      <p>Date: {event.eventDate}</p>
                      <p>Time: {event.startTime} - {event.endTime}</p>
                      <p>Location: {event.location}</p>
                      <p>Capacity: {event.capacity}</p>
                      <p>Admin Approval: {event.adminApproval ? "Yes" : "No"}</p>
                      <p>Deleted: {event.delete ? "Yes" : "No"}</p>
                      <h4>Attendances:</h4>
                      <ul>
                        {event.event_Attendances.map(attendance => (
                          <li key={attendance.event_AttendanceId}>
                            User ID: {attendance.userId}
                            <ul>
                              {attendance.reviews.map(review => (
                                <li key={review.reviewId}>
                                  Feedback: {review.feedback}, Rating: {review.rating}
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
                <p>No events available.</p>
              )
            ) : null}
          </div>

          <div>
            {/* <button
              onClick={() => this.setState(this.state.updateViewState("registration"))}
            >
              Registration
            </button> */}
            <button
              onClick={() => this.setState(this.state.updateViewState("overview"))}
            >
              Overview
            </button>
            {/* <button
              onClick={() => this.setState(this.state.updateViewState("login"))}
            >
              Login
            </button> */}
            <button
              onClick={() => this.setState(this.state.updateViewState("admindashboard"))}
            >
              Admin Dashboard
            </button>
            <button
              onClick={this.props.backToMainHome}
            >
              Log out
            </button>

          </div>
        </div>
      );
    // } else if (this.state.view === "registration") {
    //   return (
    //     <RegistrationForm
    //       backToHome={() => this.setState(this.state.updateViewState("home"))}
    //     />
    //   );
    // } else if (this.state.view === "login") {
    //   return (
    //     <Login
    //       backToHome={() => this.setState(this.state.updateViewState("home"))}
    //       setAdminStatus={this.setAdminStatus}
    //     />
    //   );
    } else if (this.state.view === "admindashboard") {
      // <Login
      // backToMainHome={() => this.setState(this.state.updateViewState("home"))}
      // setAdminStatus={this.setAdminStatus}
      // />
      if (this.props.IsAdmin) {
        return (
          <AdminDashBoard
            backToHome={() => this.setState(this.state.updateViewState("home"))}
          />
        );
      } else {
        return (
          <div>
            <p>Access Denied: Admins only</p>
            <button onClick={() => this.setState(this.state.updateViewState("home"))}>
              Back to Home
            </button>
          </div>
        );
      }
    } else {
      return (
        <OverviewPage
          backToHome={() => this.setState(this.state.updateViewState("home"))}
        />
      );
    }
  }
}