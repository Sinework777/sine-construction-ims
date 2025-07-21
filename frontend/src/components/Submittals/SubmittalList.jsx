import React from 'react';
export default function SubmittalList({ onAdd, onView }) {
  const submittals = [
    { id: 1, title: 'Concrete Mix Design', status: 'Approved', date: '2025-07-15' },
    { id: 2, title: 'Steel Rebar Specs', status: 'Pending', date: '2025-07-18' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Submittals</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onAdd}>+ New Submittal</button>
      </div>
      <ul className="divide-y divide-slate-200">
        {submittals.map(sub => (
          <li key={sub.id} className="py-3 flex justify-between items-center hover:bg-blue-50 rounded-xl transition">
            <span className="font-semibold">{sub.title}</span>
            <span className={`text-xs px-2 py-1 rounded ${sub.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'}`}>{sub.status}</span>
            <span className="text-sm text-slate-500">{sub.date}</span>
            <button className="ml-4 text-blue-600 underline" onClick={() => onView(sub)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
