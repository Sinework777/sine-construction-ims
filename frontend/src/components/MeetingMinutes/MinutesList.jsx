import React from 'react';
export default function MinutesList({ onAdd, onView }) {
  const minutes = [
    { id: 1, title: 'Kickoff Meeting', date: '2025-07-01', status: 'Finalized' },
    { id: 2, title: 'Progress Review', date: '2025-07-15', status: 'Draft' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Meeting Minutes</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onAdd}>+ Add Minutes</button>
      </div>
      <ul className="divide-y divide-slate-200">
        {minutes.map(min => (
          <li key={min.id} className="py-3 flex justify-between items-center hover:bg-blue-50 rounded-xl transition">
            <span className="font-semibold">{min.title}</span>
            <span className={`text-xs px-2 py-1 rounded ${min.status === 'Finalized' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'}`}>{min.status}</span>
            <span className="text-sm text-slate-500">{min.date}</span>
            <button className="ml-4 text-blue-600 underline" onClick={() => onView(min)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
