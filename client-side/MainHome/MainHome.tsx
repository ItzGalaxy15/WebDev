import React from "react";
import { initMainHomeState, MainHomeState } from "./mainhome.state";
import { RegistrationForm } from "../registration/registration";
import Login from "../Login/Login";


export class MainHome extends React.Component<{}, MainHomeState> {
  constructor(props: {}) {
    super(props);
    this.state = initMainHomeState;
  }

  // setAdminStatus = (status: boolean) => {
  //   this.setState({ isAdmin: status });
  // };

  render(): JSX.Element {
    if (this.state.view === "mainHome") {
      return (
        <div>
          Welcome to the Office Calendar
          <div>
            <button
              onClick={() => this.setState(this.state.updateViewState("registration"))}
            >
              Registration
            </button>
            <button
              onClick={() => this.setState(this.state.updateViewState("login"))}
            >
              Login
            </button>
          </div>
        </div>
      );
    } else if (this.state.view === "registration") {
        return (
            <RegistrationForm
            backToMainHome={() => this.setState(this.state.updateViewState("mainHome"))}
            />
        );
    } else{
        return (
            <Login
            backToMainHome={() => this.setState(this.state.updateViewState("mainHome"))}
            // setAdminStatus={this.setAdminStatus}
            />
        );
    }
  }
}