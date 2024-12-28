import React, { useState } from "react";

export interface DeleteEventProps {
  backToDashboard: () => void;
}

const DeleteEvent: React.FC<DeleteEventProps> = ({ backToDashboard }) => {
  const [eventId, setEventId] = useState<number | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEventId(parseInt(e.target.value, 10));
  };

  const handleDelete = async () => {
    if (eventId !== null) {
      const response = await fetch(`/api/v1/Events?eventId=${eventId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Event deleted successfully');
        backToDashboard();
      } else {
        console.error('Failed to delete event');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const confirmDelete = () => {
    setShowConfirmation(false);
    handleDelete();
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <h2>Delete Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event ID:</label>
          <input type="number" name="eventId" onChange={handleChange} required />
        </div>
        <button type="submit">Delete Event</button>
        <button type="button" onClick={backToDashboard}>Cancel</button>
      </form>
      {showConfirmation && (
        <div className="confirmation-popup">
          <p>Are you sure you want to delete this event?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}
    </div>
  );
};

export default DeleteEvent;