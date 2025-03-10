export type ViewState = "home" |  "admindashboard"  | "overview" | "eventdetails" | "myevents"/*| "login" | "registration";*/

export interface HomeEvent {
  eventId: number;
  title: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  adminApproval: boolean;
  delete: boolean;
  event_Attendances: Array<{
    time: string | null;
    event_AttendanceId: number;
    userId: number;
    eventId: number;
    reviews: Array<{
      reviewId: number;
      feedback: string;
      rating: number;
      eventId: number;
      event_AttendanceId: number;
    }>;
  }>;
}


export interface HomeState {
  selectedEventId: number | null;
  events: HomeEvent[];
  showEvents: boolean;
  view: ViewState;
  isAtOffice: boolean;
  updateViewState: (view: ViewState) => (state: HomeState) => HomeState;
  getEvents: (events: HomeEvent[]) => (state: HomeState) => HomeState;
}


export const initHomeState: HomeState = {
  selectedEventId: null,
  events: [],
  showEvents: true,
  view: "home",
  isAtOffice: false,
  updateViewState: (view: ViewState) => (state: HomeState): HomeState => {
    return {
      ...state,
      view: view,
    };
  },
  getEvents: (events: HomeEvent[]) => (state: HomeState): HomeState => {
      return {
        ...state,
        events: events
      };
    },
};