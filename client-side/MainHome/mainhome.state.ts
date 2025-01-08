export type ViewState = "registration" | "mainHome" | "login" 


export interface MainHomeState {
  isRegisterd : boolean
  view: ViewState;
  isAdmin?: boolean;
  updateViewState: (view: ViewState) => (state: MainHomeState) => MainHomeState;
}

export const initMainHomeState: MainHomeState = {
  isRegisterd: false,
  view: "mainHome",
  updateViewState: (view: ViewState) => (state: MainHomeState): MainHomeState => {
    return {
      ...state,
      view: view,
    };
  },
};