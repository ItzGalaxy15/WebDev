export type ViewState = "home" | "registration" | "overview" | "login";

export interface Person {
  name: string;
  lastname: string;
  age: number;
}

export interface HomeState {
  view: ViewState;
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