import React from 'react';
export default function MinutesView({ minutes, onBack }) {
  if (!minutes) return null;
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mb-4">
      <h3 className="text-xl font-bold mb-2">Meeting Minutes Details</h3>
      <div className="mb-2"><span className="font-semibold">Title:</span> {minutes.title}</div>
      <div className="mb-2"><span className="font-semibold">Date:</span> {minutes.date}</div>
      <div className="mb-2"><span className="font-semibold">Status:</span> {minutes.status}</div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onBack}>Back</button>
    </div>
  );
}
