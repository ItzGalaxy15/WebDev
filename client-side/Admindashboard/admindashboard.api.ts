import { Event } from "./admindashboard.state";

export const getAllEvents = async (): Promise<Event[]> => {
    const response = await fetch("api/v1/Events", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
  
    const result = await response.json();
    if (response.ok) {
      return result;
    } else {
      throw new Error(`Error: no events found`);
    }
  };