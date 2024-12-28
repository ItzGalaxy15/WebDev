import React, { useState, useEffect } from "react";

export interface Event {
  eventId: number;
  Title: string;
  Description: string;
  EventDate: string;
  StartTime: string;
  EndTime: string;
  Location: string;
  Capacity: number;
}

export interface EditEventProps {
  backToDashboard: () => void;
  eventId: number;
}

const EditEvent: React.FC<EditEventProps> = ({ backToDashboard, eventId }) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [modifiedFields, setModifiedFields] = useState<Set<keyof Event>>(new Set());

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`/api/v1/Events/${eventId}`);
      if (response.ok) {
        const event = await response.json();
        setEvent(event);
      } else {
        console.error('Failed to fetch event');
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (event) {
      const { name, value } = e.target;
      setEvent({ ...event, [name]: value });
      setModifiedFields((prev) => new Set(prev).add(name as keyof Event));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (event) {
      const formattedEvent: Partial<Event> = { eventId };
      modifiedFields.forEach((field) => {
        if (event[field] !== undefined) {
          (formattedEvent as any)[field] = event[field];
        }
      });

      const queryParams = Array.from(modifiedFields).map(field => `changed=${field}`).join('&');
      const response = await fetch(`/api/v1/Events?${queryParams}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedEvent),
      });

      if (response.ok) {
        backToDashboard();
      } else {
        console.error('Failed to update event');
      }
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="Title" value={event.Title} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="Description" value={event.Description} onChange={handleChange} />
        </div>
        <div>
          <label>Event Date:</label>
          <input type="date" name="EventDate" value={event.EventDate} onChange={handleChange} />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="time" name="StartTime" value={event.StartTime} onChange={handleChange} />
        </div>
        <div>
          <label>End Time:</label>
          <input type="time" name="EndTime" value={event.EndTime} onChange={handleChange} />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="Location" value={event.Location} onChange={handleChange} />
        </div>
        <div>
          <label>Capacity:</label>
          <input type="number" name="Capacity" value={event.Capacity} onChange={handleChange} />
        </div>
        <button type="submit">Save Event</button>
        <button type="button" onClick={backToDashboard}>Cancel</button>
      </form>
    </div>
  );
};

export default EditEvent;