export type ViewState = "registration" | "mainHome" | "login" 


export interface MainHomeState {
  view: ViewState;
  isAdmin?: boolean;
  updateViewState: (view: ViewState) => (state: MainHomeState) => MainHomeState;
}

export const initMainHomeState: MainHomeState = {
  view: "mainHome",
  updateViewState: (view: ViewState) => (state: MainHomeState): MainHomeState => {
    return {
      ...state,
      view: view,
    };
  },
};