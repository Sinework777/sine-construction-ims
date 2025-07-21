import React from 'react';
export default function NCRList({ onView, onAdd }) {
  const ncrs = [
    { id: 1, title: 'Concrete Pour Issue', status: 'Open', date: '2025-07-18' },
    { id: 2, title: 'Rebar Placement', status: 'Closed', date: '2025-07-15' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">NCR Log</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onAdd}>+ Add NCR</button>
      </div>
      <ul className="divide-y divide-slate-200">
        {ncrs.map(ncr => (
          <li key={ncr.id} className="py-3 flex justify-between items-center hover:bg-blue-50 rounded-xl transition">
            <span className="font-semibold">{ncr.title}</span>
            <span className={`text-xs px-2 py-1 rounded ${ncr.status === 'Open' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{ncr.status}</span>
            <span className="text-sm text-slate-500">{ncr.date}</span>
            <button className="bg-indigo-600 text-white px-3 py-1 rounded shadow hover:bg-indigo-700 transition" onClick={() => onView(ncr.id)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
