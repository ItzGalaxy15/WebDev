import React from "react";

interface EventAttendanceFormProps {
  eventId: number;
  onSuccess: () => void; // Callback function to update the UI upon success
  onFailure: (error: string) => void; // Callback function to handle errors
}

const EventAttendanceForm: React.FC<EventAttendanceFormProps> = ({ eventId, onSuccess, onFailure }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`api/v1/AttendEvent/CreateEventAttendance?eventId=${eventId -1}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const result = await response.json();
        onSuccess();
      } else {
        const textResult = await response.text();
        onFailure(textResult);
      }
    } catch (error: any) {
      onFailure(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Attend this Event</button>
    </form>
  );
};

export default EventAttendanceForm;