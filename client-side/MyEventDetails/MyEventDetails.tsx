import React from "react";
import { MyEvent } from "../MyEvents/myEvents.state";

interface MyEventDetailsProps {
    event: MyEvent;
    backToHome: () => void;
    onUnattend: (event: MyEvent) => void;
}


const MyEventDetails: React.FC<MyEventDetailsProps> = ({ event, backToHome, onUnattend }) => {
    return (
        <div>
            <h3>Title: {event.title}</h3>
            <p>Description: {event.description}</p>
            <p>Date: {event.eventDate}</p>
            <p>Time: {event.startTime} - {event.endTime}</p>
            <p>Location: {event.location}</p>
            <p>Capacity: {event.capacity}</p>
            <p>Admin Approval: {event.adminApproval ? "Yes" : "No"}</p>
            <p>Deleted: {event.delete ? "Yes" : "No"}</p>
            <h4>Attendances:</h4>
            <ul>
                {event.event_Attendances?.length ? (
                    event.event_Attendances.map(attendance => (
                        <li key={attendance.event_AttendanceId}>
                            User ID: {attendance.userId}
                            <ul>
                                {attendance.reviews?.length ? (
                                    attendance.reviews.map(review => (
                                        <li key={review.reviewId}>
                                            Feedback: {review.feedback}, Rating: {review.rating}
                                        </li>
                                    ))
                                ) : (
                                    <li>No reviews available</li>
                                )}
                            </ul>
                        </li>
                    ))
                ) : (
                    <li>No attendances available</li>
                )}
            </ul>
            <button onClick={() => onUnattend(event)}>Unattend Event</button>
            <button onClick={backToHome}>Back to home page</button>
        </div>
    );
};

export default MyEventDetails;
