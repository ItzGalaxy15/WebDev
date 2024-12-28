import React, { useState } from "react";

export interface AddEventProps {
  backToDashboard: () => void;
}

export interface Event {
  Title: string;
  Description: string;
  EventDate: string;
  StartTime: string;
  EndTime: string;
  Location: string;
  Capacity: number;
}

const AddEvent: React.FC<AddEventProps> = ({ backToDashboard }) => {
  const [event, setEvent] = useState<Event>({
    Title: "",
    Description: "",
    EventDate: "",
    StartTime: "",
    EndTime: "",
    Location: "",
    Capacity: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formattedEvent = {
      ...event,
      StartTime: `${event.StartTime}:00`, // Convert to hh:mm:ss format
      EndTime: `${event.EndTime}:00`,     // Convert to hh:mm:ss format
    };
    const response = await fetch('/api/v1/Events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedEvent),
    });

    if (response.ok) {
      backToDashboard();
    } else {
      console.error('Failed to create event');
    }
  };


  return (
    <div>
      <h2>Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" name="Title" value={event.Title} onChange={handleChange} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="Description" value={event.Description} onChange={handleChange} required />
        </div>
        <div>
          <label>Event Date:</label>
          <input type="date" name="EventDate" value={event.EventDate} onChange={handleChange} required />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="time" name="StartTime" value={event.StartTime} onChange={handleChange} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="time" name="EndTime" value={event.EndTime} onChange={handleChange} required />
        </div>
        <div>
          <label>Location:</label>
          <input type="text" name="Location" value={event.Location} onChange={handleChange} required />
        </div>
        <div>
          <label>Capacity:</label>
          <input type="number" name="Capacity" value={event.Capacity} onChange={handleChange} required />
        </div>
        <button type="submit">Save Event</button>
        <button type="button" onClick={backToDashboard}>Cancel</button>
      </form>
    </div>
  );
};

export default AddEvent;