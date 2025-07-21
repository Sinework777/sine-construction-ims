import React from 'react';
export default function BOQView({ item, onBack }) {
  if (!item) return null;
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mb-4">
      <h3 className="text-xl font-bold mb-2">BOQ Item Details</h3>
      <div className="mb-2"><span className="font-semibold">Description:</span> {item.description}</div>
      <div className="mb-2"><span className="font-semibold">Quantity:</span> {item.qty} {item.unit}</div>
      <div className="mb-2"><span className="font-semibold">Status:</span> {item.status}</div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onBack}>Back</button>
    </div>
  );
}
