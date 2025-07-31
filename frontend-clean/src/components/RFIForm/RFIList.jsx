import React from 'react';
export default function RFIList({ onAdd, onView }) {
  const rfis = [
    { id: 1, subject: 'Clarify wall finish', status: 'Open', date: '2025-07-10' },
    { id: 2, subject: 'Window spec update', status: 'Closed', date: '2025-07-12' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">RFIs</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onAdd}>+ New RFI</button>
      </div>
      <ul className="divide-y divide-slate-200">
        {rfis.map(rfi => (
          <li key={rfi.id} className="py-3 flex justify-between items-center hover:bg-blue-50 rounded-xl transition">
            <span className="font-semibold">{rfi.subject}</span>
            <span className={`text-xs px-2 py-1 rounded ${rfi.status === 'Closed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'}`}>{rfi.status}</span>
            <span className="text-sm text-slate-500">{rfi.date}</span>
            <button className="ml-4 text-blue-600 underline" onClick={() => onView(rfi)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
