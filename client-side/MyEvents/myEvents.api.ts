import { MyEvent } from "./myEvents.state";

export const getMyEvents = async (): Promise<MyEvent[]> => {
    const response = await fetch("api/v1/AttendEvent/MyEvents", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
  
    const result = await response.json();
    if (response.ok) {
        // // Get the current date and time
        // const currentDate = new Date();
        // // Filter events to include only those that are in the future
        // const futureEvents = result.filter((event: MyEvent) => {
        //     const eventDateTime = new Date(`${event.eventDate}T${event.startTime}`);
        //     return eventDateTime > currentDate;
        // });
        // return futureEvents;
        return result;
    } else {
        throw new Error(`Error: no events found`);
    }
};
