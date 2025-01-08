export type ViewState = "home" | "myevents" | "leaveReview"

export interface Review {
  Feedback: string;
  Rating: number;
  EventId: number;
}

export interface MyEvent {
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


export interface MyEventState {
  selectedEventId: number | null;
  events: MyEvent[];
  showEvents: boolean;
  view: ViewState;
  updateViewState: (view: ViewState) => (state: MyEventState) => MyEventState;
  getEvents: (events: MyEvent[]) => (state: MyEventState) => MyEventState;
}


export const initMyEventState: MyEventState = {
  selectedEventId: null,
  events: [],
  showEvents: true,
  view: "home",
  updateViewState: (view: ViewState) => (state: MyEventState): MyEventState => {
    return {
      ...state,
      view: view,
    };
  },
  getEvents: (events: MyEvent[]) => (state: MyEventState): MyEventState => {
      return {
        ...state,
        events: events
      };
    },

};