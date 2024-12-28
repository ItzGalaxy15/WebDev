import React from "react";

export interface AdminDashBoardProps {
  backToHome: () => void;
}

export class AdminDashBoard extends React.Component<AdminDashBoardProps, {}> {
  constructor(props: AdminDashBoardProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div>
        <div>
          Welcome to the admin dashboard page.
        </div>
        <div>
          <button
          
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