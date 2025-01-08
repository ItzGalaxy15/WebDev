import React from "react";
import { HomeEvent, HomeState, initHomeState } from './home.state';
import { RegistrationForm } from "../registration/registration";
import { OverviewPage } from "../Overview/overview";
import { AdminDashBoard } from "../Admindashboard/admindashboard";
import Login from "../Login/Login";
import { getAllEvents } from "./home.api";
import EventDetails from "../EventDetails/EventDetails";
import { MyEvents } from "../MyEvents/MyEvents";
import { ArriveToOffice, IsAtOffice, LeaveOffice } from "../Profile/profile.api";


export interface HomeProps {
  backToMainHome: () => void;
  IsAdmin: boolean;
}

export class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      ...initHomeState
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
  };

  renderEventList = () => (
    <ul>
      {this.state.events.map((event, index) => (
                               //  "selecting" an event when you click on it. 
                               <li key={event.eventId} onClick={() => { this.selectEvent(event.eventId); this.setState(this.state.updateViewState("eventdetails")); }}>
          Event{index + 1}: {event.title}
        </li>
      ))}
    </ul>
  );

  render(): JSX.Element {
    const { view, selectedEventId } = this.state;
    const selectedEvent = this.state.events.find(event => event.eventId === selectedEventId);
    if (view === "home") {
      return (
        <div>
          <h1>Welcome to our home page</h1>
          {this.state.showEvents && !selectedEvent && this.renderEventList()}
          <div>
            <button onClick={this.handleAttendanceToggle}>
              {this.state.isAtOffice ? "Leave office" : "Arrive to office"}
            </button>
            <button onClick={() => this.setState(this.state.updateViewState("overview"))}>Overview</button>
            <button onClick={() => this.setState(this.state.updateViewState("admindashboard"))}>Admin Dashboard</button>
            <button onClick={() => this.setState(this.state.updateViewState("myevents"))}>My Events</button>
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
    } else if (this.state.view === "eventdetails"){
      const event = this.state.events.find(event => event.eventId === selectedEventId);
      if (event) {
        return (
          <EventDetails
            event={event}
            backToHome={() => {
              this.selectEvent(null); // Reset selected event
              this.setState(this.state.updateViewState("home"));
            }}
          />
        );
      } else {
        return (
          <div>
            <p>Event not found</p>
            <button onClick={() => this.setState(this.state.updateViewState("home"))}>
              Back to Home
            </button>
          </div>
        );
      }
    } else if (this.state.view === "myevents"){
    return (
      <MyEvents
      backToHome={() => this.setState(this.state.updateViewState("home"))}
      />
    )

    } else {
      return (
        <OverviewPage
          backToHome={() => this.setState(this.state.updateViewState("home"))}
        />
      );
    }
  }
}
