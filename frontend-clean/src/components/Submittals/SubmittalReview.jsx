import React, { useState } from 'react';

const initialReview = {
  comments: '',
  status: 'Pending',
};

export default function SubmittalReview({ submittal, onReview }) {
  const [review, setReview] = useState(initialReview);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setReview(r => ({ ...r, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onReview(review);
    setReview(initialReview);
  }

  return (
    <div className="space-y-6 bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-yellow-800">Review Submittal: {submittal.title}</h2>
      <form className="space-y-6 bg-white p-8 rounded-xl shadow-xl" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold mb-1 text-yellow-700">Comments</label>
          <textarea
            name="comments"
            className="w-full rounded px-3 py-2 border border-yellow-300 focus:ring-2 focus:ring-yellow-500"
            value={review.comments}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-yellow-700">Status</label>
          <select
            name="status"
            className="w-full rounded px-3 py-2 border border-yellow-300 focus:ring-2 focus:ring-yellow-500"
            value={review.status}
            onChange={handleInputChange}
          >
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 transition shadow-md"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
}
