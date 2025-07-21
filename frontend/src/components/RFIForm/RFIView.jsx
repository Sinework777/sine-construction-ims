import React from 'react';
export default function RFIView({ rfi, onBack }) {
  if (!rfi) return null;
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mb-4">
      <h3 className="text-xl font-bold mb-2">RFI Details</h3>
      <div className="mb-2"><span className="font-semibold">Subject:</span> {rfi.subject}</div>
      <div className="mb-2"><span className="font-semibold">Status:</span> {rfi.status}</div>
      <div className="mb-2"><span className="font-semibold">Date:</span> {rfi.date}</div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onBack}>Back</button>
    </div>
  );
}
