import React, { useState, useEffect } from "react";

export interface Attendee {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  recuringDays: string;
}

export interface EventAttendeesProps {
  backToDashboard: () => void;
  eventId: number;
}

const EventAttendees: React.FC<EventAttendeesProps> = ({ backToDashboard, eventId }) => {
  const [attendees, setAttendees] = useState<Attendee[] | null>(null);

  useEffect(() => {
    const fetchAttendees = async () => {
      const response = await fetch(`/api/v1/AttendEvent/GetEventAttendees?eventId=${eventId}`);
      if (response.ok) {
        const attendees = await response.json();
        setAttendees(attendees);
      } else {
        console.error('Failed to fetch attendees');
      }
    };

    fetchAttendees();
  }, [eventId]);

  if (!attendees) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Event Attendees</h2>
      <ul>
        {attendees.map(attendee => (
          <li key={attendee.userId}>
            <p>Name: {attendee.firstName} {attendee.lastName}</p>
            <p>Email: {attendee.email}</p>
            <p>Recurring Days: {attendee.recuringDays}</p>
          </li>
        ))}
      </ul>
      <button onClick={backToDashboard}>Back</button>
    </div>
  );
};

export default EventAttendees;