import React from "react";
import { Navigate } from "react-router-dom";
import { initMainHomeState, MainHomeState } from "./mainhome.state";

import Login from "../Login/Login";
import { RegistrationForm } from "../registration/registration";

export interface MainHomeProps {
  backtoHomePage: () => void;
}

export class MainHome extends React.Component<{}, MainHomeState> {
  constructor(props: {}) {
    super(props);
    this.state = initMainHomeState;
  }

  render(): JSX.Element {
    // Reusable styles
    const styles = {
      outerContainer: {
        width: "100%",
        minHeight: "100vh",
        margin: 0,
        padding: 0,
        boxSizing: "border-box" as const,
        // Center everything on a full-screen gradient
        display: "flex",
        flexDirection: "column" as const,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        background:
          "linear-gradient(135deg, rgb(172, 207, 206) 0%, rgb(91, 146, 146) 100%)",
      },
      contentWrapper: {
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
        width: "90%",
        maxWidth: "500px",
        textAlign: "center" as const,
      },
      heading: {
        fontWeight: 600,
        fontSize: "2rem",
        color: "#fff",
        marginBottom: "30px",
      },
      button: {
        width: "100%",
        maxWidth: "300px",
        padding: "15px",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        marginTop: "15px",
        fontSize: "1rem",
        fontWeight: 600,
        color: "#000",
        background:
          "linear-gradient(135deg, rgb(247, 247, 244) 0%, rgb(248, 246, 248) 100%)",
        transition: "background 0.3s ease, transform 0.2s ease",
      },
    };

    // Decide which component/view to render based on this.state.view
    if (this.state.view === "mainHome") {
      return (
        <div style={styles.outerContainer}>
          <div style={styles.contentWrapper}>
            <h1 style={styles.heading}>Welcome to the Office Calendar</h1>
            <button
              style={styles.button}
              onClick={() => this.setState(this.state.updateViewState("registration"))}
            >
              Registration
            </button>
            <button
              style={styles.button}
              onClick={() => this.setState(this.state.updateViewState("login"))}
            >
              Login
            </button>
          </div>
        </div>
      );
    } else if (this.state.view === "registration") {
      // Wrap the RegistrationForm in the same background so it stays consistent
      return (
        <Navigate to="/registration" />
      );
    } else {
      // "login" view
      return (
        <Navigate to="/login" />
      );
    }
  }
}

export default MainHome;
