import React from "react";
import { getAllEvents } from "./admindashboard.api";
import { AdminDashBoardState, initAdminDashBoardState, Event } from "./admindashboard.state";
import AddEvent from "./addevent";
import EditEvent from "./editevent";

export interface AdminDashBoardProps {
  backToHome: () => void;
}

export class AdminDashBoard extends React.Component<AdminDashBoardProps, AdminDashBoardState> {
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

  render(): JSX.Element {
    if (this.state.view === "addEvent") {
      return <AddEvent backToDashboard={() => this.setState({ view: "dashboard" })} />;
    }

    if (this.state.view === "editEvent" && this.state.editEventId !== null) {
      return <EditEvent backToDashboard={() => this.setState({ view: "dashboard" })} eventId={this.state.editEventId} />;
    }

    return (
      <div>
        <div>
          Welcome to the admin dashboard page.
        </div>
        <div>
          <button
            onClick={this.printEvents}
          >
            View all events
          </button>
          <button 
            onClick={() => this.setState({ view: "addEvent" })}
          >
            Add new event
          </button>
          <form onSubmit={this.handleEditEvent}>
            <input type="number" name="eventId" placeholder="Enter event ID" required />
            <button type="submit">
              Edit event
            </button>
          </form>
          <button
            onClick={this.props.backToHome}
          >
            Back
          </button>
        </div>
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
      </div>
    );
  }
}

export default AdminDashBoard;