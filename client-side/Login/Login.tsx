import React from "react";
import { initLoginState, LoginState } from "./login.state";
import { login, isAdmin, logout, isSomeoneLoggedIn } from "./login.api";
import { Home } from "../Home/Home";
import { MainHome } from "../MainHome/MainHome";
import { Link, redirect, Navigate } from "react-router-dom";

export interface LoginProps {
  backToMainHome: () => void;
}

export class Login extends React.Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = initLoginState;
  }
  setAdminStatus = (status: boolean) => {
    this.setState({ isAdmin: status });
  };

  handleIsAdmin = async () => {
    const adminStatus = await isAdmin();
    if (adminStatus) {
      this.setAdminStatus(true);
    }
  }

  handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const message = await login(this.state.username, this.state.password);
      this.setState(this.state.updateMessage(message));
      if (message.includes("Logged in")) {
        await this.handleIsAdmin(); // Check if the user is an admin
        this.setState(this.state.updateViewLoginState("loggedin"));
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error: any) {
      this.setState(
        this.state.updateMessage(error.message || "An unknown error occurred")
      );
    }
  };

  handleLogout = async () => {
    const response = await isSomeoneLoggedIn();
    if (response) {
      await logout();
      this.setState(this.state.updateMessage("Logged out"));
      this.setAdminStatus(false);
      this.setState(this.state.updateViewLoginState("loggedout"))
    } else {
      this.setState(this.state.updateMessage("No one is logged in"));
    }
  };  

  handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name in this.state) {
      this.setState({ [name]: value } as unknown as Pick<LoginState, keyof LoginState>);
    }
  };

  render() {
    const styles = {
      // Full-screen background
      outerContainer: {
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "'Poppins', sans-serif",
        background: "linear-gradient(135deg, rgb(172, 207, 206) 0%, rgb(91, 146, 146) 100%)",
      },
      // Heading above the frosted box
      welcomeHeading: {
        fontWeight: 600,
        fontSize: "2.2rem",
        color: "#fff",
        marginBottom: "30px",
        textAlign: "center" as const,
      },
      // The frosted box itself
      container: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "flex-start", // left-align contents
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        borderRadius: "20px",
        padding: "40px",
        width: "900px",       // Wide container
        maxWidth: "90%",
      },
      // "Sign In" heading inside the box
      signInTitle: {
        alignSelf: "center", // center this specific title
        fontWeight: 600,
        fontSize: "1.8rem",
        color: "#fff",
        marginBottom: "20px",
      },
      // Each label/input pair is left-aligned
      formGroup: {
        display: "flex",
        flexDirection: "column" as const,
        width: "100%",
        marginBottom: "20px",
      },
      label: {
        marginBottom: "5px",
        fontWeight: 600,
        color: "#fff",
        fontSize: "1rem",
      },
      input: {
        padding: "15px",
        borderRadius: "8px",
        border: "none",
        outline: "none",
        fontSize: "1rem",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        transition: "all 0.3s ease",
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
      },
      // Button style
      button: {
        width: "120px", // fixed width to center them nicely
        padding: "15px",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: 600,
        color: "#000",
        background: "linear-gradient(135deg, rgb(247, 247, 244) 0%, rgb(248, 246, 248) 100%)",
        transition: "background 0.3s ease, transform 0.2s ease",
      },
      // Sign In / Logout button group, center-aligned
      buttonGroup: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        marginTop: "20px",
      },
      // "Remember Me" on the left
      rememberRow: {
        display: "flex",
        alignItems: "center",
        marginTop: "10px",
        fontSize: "0.9rem",
        color: "#fff",
      },
      message: {
        marginTop: "20px",
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "10px",
        color: "#333",
        textAlign: "center" as const,
        fontWeight: 500,
        width: "100%",
      },
      // Back button also left-aligned
      backButton: {
        marginTop: "20px",
        padding: "10px 15px",
        color: "#000",
        backgroundColor: "#fff",
        border: "2px solid rgb(5, 5, 5)",
        borderRadius: "20px",
        fontWeight: 600,
        cursor: "pointer",
        transition: "all 0.3s ease",
      },
    };

    if (this.state.viewLoginState === "login") {
      return (
        <div style={styles.outerContainer}>
          {/* Heading outside the frosted box */}
          <h1 style={styles.welcomeHeading}>Welcome to login</h1>

          {/* Frosted box */}
          <div style={styles.container}>
            <h2 style={styles.signInTitle}>Sign In</h2>

            <form onSubmit={this.handleLogin} style={{ width: "100%" }}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Username:</label>
                <input
                  style={styles.input}
                  name="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                  placeholder="Enter your username"
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Password:</label>
                <input
                  style={styles.input}
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  placeholder="Enter your password"
                />
              </div>

              {/* Buttons center-aligned */}
              <div style={styles.buttonGroup}>
                <button type="submit" style={styles.button}>
                  Sign In
                </button>
                <button
                  type="button"
                  style={styles.button}
                  onClick={this.handleLogout}
                >
                  Logout
                </button>
              </div>

              {/* Optional "Remember Me" */}
              <div style={styles.rememberRow}>
                <input type="checkbox" style={{ marginRight: "5px" }} />
                <span>Remember Me</span>
              </div>

              {/* Show any error/success messages */}
              {this.state.message && (
                <div style={styles.message}>{this.state.message}</div>
              )}
            </form>

            {/* Back button left-aligned (below the form) */}
            <Link to="/">
              <button style={styles.backButton}>
                Back
              </button>
            </Link>
          </div>
        </div>
      );
    } else if (this.state.viewLoginState === "loggedin") {
      return <Navigate to="/home" />;
    } else {
      return <MainHome />;
    }
  }
}

export default Login;
