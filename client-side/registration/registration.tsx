import React from "react";
import { initRegistrationState, RegisterationState } from "./registration.state";
import { submit } from "./registration.api";
import { Link } from "react-router-dom";

export interface RegisterationProps {
  backToMainHome: () => void;
}

export class RegistrationForm extends React.Component<
  RegisterationProps,
  RegisterationState
> {
  constructor(props: RegisterationProps) {
    super(props);
    this.state = initRegistrationState;
  }

  handelsubmit = () => {
    submit({
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      password: this.state.password,
      username: this.state.username,
      recuringdays: this.state.recuringdays,
    });
    this.setState(initRegistrationState);
    this.props.backToMainHome();
  };

  render(): JSX.Element {
    // Styles
    const styles = {
      // Full-screen gradient background, just like your other pages
      outerContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        margin: 0,
        fontFamily: "'Poppins', sans-serif",
        background:
          "linear-gradient(135deg, rgb(172, 207, 206) 0%, rgb(91, 146, 146) 100%)",
      },
      // Frosted glass container
      container: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
        borderRadius: "20px",
        padding: "40px",
        width: "400px",
        maxWidth: "90%",
        display: "flex",
        flexDirection: "column" as const,
        alignItems: "center",
      },
      heading: {
        fontWeight: 600,
        fontSize: "1.8rem",
        color: "#fff",
        marginBottom: "20px",
        textAlign: "center" as const,
      },
      label: {
        display: "block",
        marginBottom: "5px",
        fontWeight: 600,
        color: "#fff",
        fontSize: "1rem",
      },
      input: {
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: "none",
        marginBottom: "15px",
        outline: "none",
        fontSize: "1rem",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.2)",
      },
      button: {
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        marginTop: "10px",
        fontSize: "1rem",
        fontWeight: 600,
        color: "#000",
        background:
          "linear-gradient(135deg, rgb(247, 247, 244) 0%, rgb(248, 246, 248) 100%)",
        transition: "background 0.3s ease, transform 0.2s ease",
      },
      linkButton: {
        width: "100%",
        padding: "12px",
        border: "none",
        borderRadius: "25px",
        cursor: "pointer",
        marginTop: "10px",
        fontSize: "1rem",
        fontWeight: 600,
        color: "#000",
        background:
          "linear-gradient(135deg, rgb(247, 247, 244) 0%, rgb(248, 246, 248) 100%)",
        textAlign: "center" as const,
        textDecoration: "none" as const,
      },
    };

    return (
      <div style={styles.outerContainer}>
        <div style={styles.container}>
          <h2 style={styles.heading}>Welcome to the Registration Page</h2>

          {/* First Name */}
          <label style={styles.label}>First Name:</label>
          <input
            style={styles.input}
            value={this.state.firstname}
            onChange={(e) =>
              this.setState(this.state.updateName(e.currentTarget.value))
            }
          />

          {/* Last Name */}
          <label style={styles.label}>Last Name:</label>
          <input
            style={styles.input}
            value={this.state.lastname}
            onChange={(e) =>
              this.setState(this.state.updateLastName(e.currentTarget.value))
            }
          />

          {/* Username */}
          <label style={styles.label}>User Name:</label>
          <input
            style={styles.input}
            value={this.state.username}
            placeholder="it should contain '@'"
            onChange={(e) =>
              this.setState(this.state.updateUsername(e.currentTarget.value))
            }
          />

          {/* Password */}
          <label style={styles.label}>Password:</label>
          <input
            style={styles.input}
            type="password"
            value={this.state.password}
            onChange={(e) =>
              this.setState(this.state.updatePassword(e.currentTarget.value))
            }
          />

          {/* Submit button */}
          <button
            style={styles.button}
            onClick={() => {
              this.handelsubmit();
            }}
          >
            Submit
          </button>

          {/* Back button via React Router <Link> */}
          <Link to="/" style={{ width: "100%", textDecoration: "none" }}>
            <button style={styles.linkButton}>Back</button>
          </Link>
        </div>
      </div>
    );
  }
}
