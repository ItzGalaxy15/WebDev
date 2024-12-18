import React from "react";
import { initLoginState, LoginState } from "./login.state";
import { login } from "./login.api";

export interface LoginProps {
  backToHome: () => void;
}

export class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = initLoginState;
  }

  handleLogin = async () => {
    const message = await login(this.state.username, this.state.password);
    this.setState(this.state.updateMessage(message));
  };

  render(): JSX.Element {
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
          <br />
          {this.state.message && <div>{this.state.message}</div>}
          <br />
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

export default Login;