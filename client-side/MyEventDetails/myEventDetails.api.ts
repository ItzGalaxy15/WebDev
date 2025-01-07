import { MyEvent } from "../MyEvents/myEvents.state";

export const deleteEventAttendance = async(myevent:MyEvent): Promise<void> =>{
    try{
        const response = await fetch(`api/v1/AttendEvent/DeleteEventAttendance?eventId=${myevent.eventId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },  
        });
        if (response.ok) {
            const result = await response.json();
            onSuccess(`Event attendance ${myevent.title} successfully deleted.`);
        } else {
            const textResult = await response.text();
            onFailure(textResult);
            // throw new Error(`Error: no event found with id ${eventId}`);
        }
    } catch (error: any) {
    onFailure(error.message);
  }
}


function onSuccess(Message: string) {
    alert(`${Message}`);
}

function onFailure(errorMessage: string) {
    alert("Failed to delete event attendance: " + errorMessage);
}
