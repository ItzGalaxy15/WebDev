
export type ViewLoginState = "login" |  "loggedin"  | "loggedout"

export type LoginState = {
  viewLoginState : ViewLoginState,
  username: string;
  password: string;
  message: string;
  updateUsername: (username: string) => (state: LoginState) => LoginState;
  updatePassword: (password: string) => (state: LoginState) => LoginState;
  updateMessage: (message: string) => (state: LoginState) => LoginState;
  clearContents: () => (state: LoginState) => LoginState;
  updateViewLoginState: (view: ViewLoginState) => (state: LoginState) => LoginState;
}

export const initLoginState: LoginState = {
  viewLoginState: "login",
  username: "",
  password: "",
  message: "",

  updateUsername: (username: string) => (state: LoginState): LoginState => {
    return {
      ...state,
      username: username,
    };
  },

  updatePassword: (password: string) => (state: LoginState): LoginState => {
    return {
      ...state,
      password: password,
    };
  },

  updateMessage: (message: string) => (state: LoginState): LoginState => {
    return {
      ...state,
      message: message,
    };
  },

  clearContents: () => (state: LoginState): LoginState => {
    return {
      ...state,
      username: "",
      password: "",
      message: "",
    };
  },
  updateViewLoginState: (view: ViewLoginState) => (state: LoginState): LoginState => {
    return {
      ...state,
      viewLoginState: view,
    };
  },
};