import React from "react";
import { initMyEventState, MyEvent, MyEventState } from "./myEvents.state";
import { getMyEvents } from "./myEvents.api";
import MyEventDetails from "../MyEventDetails/MyEventDetails";

export interface MyEventProps {
    // onSuccess: () => void;
    // onFailure: (error: string) => void; 
    backToHome: () => void;
//   IsAdmin: boolean;
}

export class MyEvents extends React.Component<MyEventProps, MyEventState> {
  constructor(props: MyEventProps) {
    super(props);
    this.state = {
      ...initMyEventState
    };
  }

  printEvents = async () => {
    const events: MyEvent[] = await getMyEvents();
    this.setState({ ...this.state, events: events });
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
                               <li key={event.eventId} onClick={() => {
                                this.selectEvent(event.eventId);
                                this.setState(prevState => prevState.updateViewState("myevents")(prevState));
                            }}>
          Event{index + 1}: {event.title}
        </li>
      ))}
    </ul>
  );

  render(): JSX.Element {
    const { view, selectedEventId } = this.state;
    const selectedEvent = this.state.events.find(event => event.eventId === this.state.selectedEventId);


    if (this.state.view === "home") {
        return (
          <div>
               <p>Here you can see your events</p>
              {this.state.showEvents && !selectedEvent && this.renderEventList()}
              <div>
                <button onClick={this.props.backToHome}>Back to Home</button>
              </div>
            </div>
        );
    } else  /*if (this.state.view === "myevents")*/ {
        const event = this.state.events.find(event => event.eventId === selectedEventId);
        console.log("Selected Event ID:", event);
        console.log("Current View:", this.state.view);
        if (event) {
            return (
                <MyEventDetails
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
                        Back to see your events
                    </button>
                </div>
            );
        }
    }
  }
}

