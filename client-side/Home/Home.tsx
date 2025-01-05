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

interface HomeStateExtended extends HomeState {
  selectedEventId: number | null;
}

export class Home extends React.Component<HomeProps, HomeStateExtended> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      ...initHomeState,
      selectedEventId: null,
    };
  }

  printEvents = async () => {
    const events: HomeEvent[] = await getAllEvents();
    this.setState({ ...this.state, events });
  };

  componentDidMount(): void {
    this.printEvents();
  }

  selectEvent = (eventId: number | null) => {
    this.setState({ ...this.state, selectedEventId: eventId });
  };

  renderEventList = () => (
    <ul>
      {this.state.events.map((event, index) => (
                               //  "selecting" an event when you click on it. 
        <li key={event.eventId} onClick={() => this.selectEvent(event.eventId)}>
          Event{index + 1}: {event.title}
        </li>
      ))}
    </ul>
  );

  renderEventDetails = (event: HomeEvent) => (
    <div>
      <h3>Title: {event.title}</h3>
      <p>Description: {event.description}</p>
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
    </div>
  );

  render(): JSX.Element {
    const { view, selectedEventId } = this.state;
    const selectedEvent = this.state.events.find(event => event.eventId === selectedEventId);
    if (this.state.view === "home") {
      return (
        <div>
            Welcome to our home page
            {this.state.showEvents && !selectedEvent && this.renderEventList()}
            {selectedEvent && this.renderEventDetails(selectedEvent)}
            <button onClick={() => this.selectEvent(null)}>Back to home page</button>
            <div>
              <button onClick={() => this.setState(this.state.updateViewState("overview"))}>Overview</button>
              <button onClick={() => this.setState(this.state.updateViewState("admindashboard"))}>Admin Dashboard</button>
              <button onClick={this.props.backToMainHome}>Log out</button>
            </div>
          </div>
      );
      
    } else if (this.state.view === "admindashboard") {
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