import React, { useState } from "react";

export interface AddReviewProps {
  backToPreviousScreen: () => void;
  eventId: number;
}

export interface Review {
  Feedback: string;
  Rating: number;
  EventId: number;
}

const AddReview: React.FC<AddReviewProps> = ({ eventId, backToPreviousScreen }) => {
  const [review, setReview] = useState<Review>({
    Feedback: "",
    Rating: 1,
    EventId: eventId,
  });

  const handleChange = (r: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = r.target;
    setReview({ ...review, [name]: name === "Rating" || name === "EventId" ? parseInt(value, 10) : value });
  };

  const handleSubmit = async (r: React.FormEvent) => {
    r.preventDefault();
    const response = await fetch('api/v1/AttendEvent/AddReview', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    });

    if (response.ok) {
      backToPreviousScreen();
    } else {
      console.error('Failed to add review');
    }
  };

  return (
    <div>
      <h2>Add Review</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Feedback:</label>
          <textarea name="Feedback" value={review.Feedback} onChange={handleChange} required />
        </div>
        <div>
          <label>Rating:</label>
          <select name="Rating" value={review.Rating} onChange={handleChange} required>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button type="submit">Submit Review</button>
        <button type="button" onClick={backToPreviousScreen}>Cancel</button>
      </form>
    </div>
  );
};

export default AddReview;