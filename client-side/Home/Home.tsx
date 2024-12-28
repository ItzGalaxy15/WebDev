import React from "react";
import { HomeState, initHomeState } from './home.state';
import { RegistrationForm } from "../registration/registration";
import { OverviewPage } from "../Overview/overview";
import { AdminDashBoard } from "../Admindashboard/admindashboard";
import Login from "../Login/Login"; // Import the Login component

export class Home extends React.Component<{}, HomeState> {
  constructor(props: {}) {
    super(props);
    console.log("Home component initialized");
    this.state = initHomeState;
  }

  setAdminStatus = (status: boolean) => {
    this.setState({ isAdmin: status });
  };

  render(): JSX.Element {
    console.log("Rendering buttons for state:", this.state.view);
    if (this.state.view === "home") {
      console.log("Rendering home view");
      return (
        <div>
          Welcome to our home page
          <div>
            <button
              onClick={() => this.setState(this.state.updateViewState("registration"))}
            >
              Registration
            </button>
            <button
              onClick={() => this.setState(this.state.updateViewState("overview"))}
            >
              Overview
            </button>
            <button
              onClick={() => this.setState(this.state.updateViewState("login"))}
            >
              Login
            </button>
            <button
              onClick={() => this.setState(this.state.updateViewState("admindashboard"))}
            >
              Admin Dashboard
            </button>
          </div>
        </div>
      );
    } else if (this.state.view === "registration") {
      return (
        <RegistrationForm
          backToHome={() => this.setState(this.state.updateViewState("home"))}
        />
      );
    } else if (this.state.view === "login") {
      return (
        <Login
          backToHome={() => this.setState(this.state.updateViewState("home"))}
          setAdminStatus={this.setAdminStatus}
        />
      );
    } else if (this.state.view === "admindashboard") {
      if (this.state.isAdmin) {
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