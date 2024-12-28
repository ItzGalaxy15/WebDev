export interface Event {
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
  
  export interface AdminDashBoardState {
    events: Event[];
    showEvents: boolean;
    view: string;
    updateEvents: (events: Event[]) => (state: AdminDashBoardState) => AdminDashBoardState;
    toggleShowEvents: () => (state: AdminDashBoardState) => AdminDashBoardState;
    clearEvents: () => (state: AdminDashBoardState) => AdminDashBoardState;
  }
  
  export const initAdminDashBoardState: AdminDashBoardState = {
    events: [],
    showEvents: false,
    view: "dashboard",
  
    updateEvents: (events: Event[]) => (state: AdminDashBoardState): AdminDashBoardState => {
      return {
        ...state,
        events: events,
        showEvents: true,
      };
    },

    toggleShowEvents: () => (state: AdminDashBoardState): AdminDashBoardState => {
        return {
          ...state,
          showEvents: !state.showEvents,
        };
      },
  
    clearEvents: () => (state: AdminDashBoardState): AdminDashBoardState => {
      return {
        ...state,
        events: [],
        showEvents: false,
      };
    },
  };