export type ViewState = "home" | "registration" | "overview" | "login" | "admindashboard";

export interface Person {
  name: string;
  lastname: string;
  age: number;
}

export interface HomeState {
  view: ViewState;
  isAdmin?: boolean;
  updateViewState: (view: ViewState) => (state: HomeState) => HomeState;
}

export const initHomeState: HomeState = {
  view: "home",
  updateViewState: (view: ViewState) => (state: HomeState): HomeState => {
    return {
      ...state,
      view: view,
    };
  },
};