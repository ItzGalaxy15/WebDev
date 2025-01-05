import React from "react";
import { initLoginState, LoginState } from "./login.state";
import { login } from "./login.api";
import { isAdmin } from "./login.api";
import { logout } from "./login.api";
import { isSomeoneLoggedIn } from "./login.api";
import { Home } from "../Home/Home";
import { MainHome } from "../MainHome/MainHome";

export interface LoginProps {
  backToMainHome: () => void;
  setAdminStatus: (status: boolean) => void;
}

export class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = initLoginState;
  }

  handleIsAdmin = async () => {
    const adminStatus = await isAdmin();
    if (adminStatus) {
      this.props.setAdminStatus(true);
    }
  }

  handleLogin = async () => {
    const message = await login(this.state.username, this.state.password);
    this.setState(this.state.updateMessage(message));
    if (message.includes("Success")) {
      this.handleIsAdmin();
    }
    this.setState(this.state.updateViewLoginState("loggedin"))
  };

  handleLogout = async () => {
    const response = await isSomeoneLoggedIn();
    if (response) {
      await logout();
      this.setState(this.state.updateMessage("Logged out"));
      this.props.setAdminStatus(false);
      this.setState(this.state.updateViewLoginState("loggedout"))
    } else {
      this.setState(this.state.updateMessage("No one is logged in"));
    }
  };  

  render(): JSX.Element {
    if (this.state.viewLoginState === "login"){
        return (
        <div>
          <div>
            Welcome to our Login page
          </div>
          <br />
          <div>
            Username:
            <input
              value={this.state.username}
              onChange={(e) => this.setState(this.state.updateUsername(e.currentTarget.value))}
            />
            <br />
            Password:
            <input
              type="password"
              value={this.state.password}
              onChange={(e) => this.setState(this.state.updatePassword(e.currentTarget.value))}
            />
            <br />
            <button
              onClick={this.handleLogin}
            >
              Login
            </button>
            <button
              onClick={this.handleLogout}
            >
              Logout
            </button>
            <br />
            {this.state.message && <div>{this.state.message}</div>}
            <br />
            <button
              onClick={this.props.backToMainHome}
            >
              Back
            </button>
          </div>
        </div>
      );
    } else if (this.state.viewLoginState === "loggedin"){
        return (
          <Home
            backToMainHome={this.handleLogout}
            setAdminStatus={this.props.setAdminStatus}
          />
        );
    } else {
      return (
        <MainHome
        />
      )
    }
  }
}
export default Login;