import React from 'react';
export default function SubmittalReview() {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h2 className="text-lg font-bold mb-2">Submittal Review</h2>
      <div className="flex gap-2 mb-2">
        <button className="bg-green-600 text-white px-4 py-2 rounded">Approve</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded">Reject</button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded">Comment</button>
      </div>
      <textarea className="border p-2 rounded w-full" placeholder="Add review comments..." />
      <div className="mt-2 text-xs text-gray-500">Audit trail: All actions are logged for compliance.</div>
    </div>
  );
}
