import React from "react";
import { HomeEvent, HomeState, initHomeState } from './home.state';
import { OverviewPage } from "../Overview/overview";
import { AdminDashBoard } from "../Admindashboard/admindashboard";
import Login from "../Login/Login"; // Import the Login component
import { getAllEvents } from "./home.api";
import EventDetails from "../EventDetails/EventDetails";
import { MyEvents } from "../MyEvents/MyEvents";


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
                               <li key={event.eventId} onClick={() => { this.selectEvent(event.eventId); this.setState(this.state.updateViewState("eventdetails")); }}>
          Event{index + 1}: {event.title}
        </li>
      ))}
    </ul>
  );

  // handleEventNotFound = () => {
  //   this.setState(this.state.updateViewState("home"));
  //   this.selectEvent(null);
  // };


  render(): JSX.Element {
    const { view, selectedEventId } = this.state;
    const selectedEvent = this.state.events.find(event => event.eventId === selectedEventId);
    if (this.state.view === "home") {
      return (
        <div>
            Welcome to our home page
            {this.state.showEvents && !selectedEvent && this.renderEventList()}
            {/* {selectedEvent && this.renderEventDetails(selectedEvent)} */}
            {/* <button onClick={() => this.selectEvent(null)}>Back to home page</button> */}
            <div>
              <button onClick={() => this.setState(this.state.updateViewState("overview"))}>Overview</button>
              <button onClick={() => this.setState(this.state.updateViewState("admindashboard"))}>Admin Dashboard</button>
              <button onClick={() => this.setState(this.state.updateViewState("myevents"))}> My Events </button>
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
      // onSuccess={() => alert('Successfully removed yourself from the event!')}
      // onFailure={(error) => alert(error)}
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




  // renderEventDetails = (event: HomeEvent) => (
  //   <div>
  //     <h3>Title: {event.title}</h3>
  //     <p>Description: {event.description}</p>
  //     <p>Date: {event.eventDate}</p>
  //     <p>Time: {event.startTime} - {event.endTime}</p>
  //     <p>Location: {event.location}</p>
  //     <p>Capacity: {event.capacity}</p>
  //     <p>Admin Approval: {event.adminApproval ? "Yes" : "No"}</p>
  //     <p>Deleted: {event.delete ? "Yes" : "No"}</p>
  //     <h4>Attendances:</h4>
  //     <ul>
  //       {event.event_Attendances.map(attendance => (
  //         <li key={attendance.event_AttendanceId}>
  //           User ID: {attendance.userId}
  //           <ul>
  //             {attendance.reviews.map(review => (
  //               <li key={review.reviewId}>
  //                 Feedback: {review.feedback}, Rating: {review.rating}
  //               </li>
  //             ))}
  //           </ul>
  //         </li>
  //       ))}
  //     </ul>
  //     {/* <EventAttendanceForm 
  //       eventId={event.eventId}
  //       onSuccess={() => alert('Successfully registered for the event!')}
  //       onFailure={(error) => alert(error)}
  //     /> */}
  //   </div>
  // );


// interface EventAttendanceFormProps {
//   eventId: number;
//   onSuccess: () => void; // Callback function to update the UI upon success
//   onFailure: (error: string) => void; // Callback function to handle errors
// }

// function EventAttendanceForm({ eventId, onSuccess, onFailure }: EventAttendanceFormProps) {
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`api/v1/AttendEvent/CreateEventAttendance?eventId=${eventId -1}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       if (response.ok) {
//         const result = await response.json();
//         onSuccess();
//       } else {
//         const textResult = await response.text();
//         onFailure(textResult);
//       }
//     } catch (error: any) {
//       onFailure(error.message);
//   }
// };

//   return (
//     <form onSubmit={handleSubmit}>
//       <button type="submit">Attend this Event</button>
//     </form>
//   );
// }