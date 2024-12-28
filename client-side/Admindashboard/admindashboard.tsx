import React from "react";
import { getAllEvents } from "./admindashboard.api";

export interface AdminDashBoardProps {
  backToHome: () => void;
}

export class AdminDashBoard extends React.Component<AdminDashBoardProps, {}> {
  constructor(props: AdminDashBoardProps) {
    super(props);
  }

  printEvents = async () => {
    const message = await getAllEvents();
    console.log(message);
  };

  render(): JSX.Element {
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
            onClick={this.props.backToHome}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default AdminDashBoard;