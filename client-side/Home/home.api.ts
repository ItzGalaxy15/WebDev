import { HomeEvent } from "./home.state";



export const getAllEvents = async (): Promise<HomeEvent[]> => {
    const response = await fetch("api/v1/Events", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
  
    const result = await response.json();
    if (response.ok) {
        // Get the current date and time
        const currentDate = new Date();
        // Filter events to include only those that are in the future
        const futureEvents = result.filter((event: HomeEvent) => {
            const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
            return eventDateTime > currentDate;
        });
        return futureEvents;
        // return result;
    } else {
        throw new Error(`Error: no events found`);
    }

};