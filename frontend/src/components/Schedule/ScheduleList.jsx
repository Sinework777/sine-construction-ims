import React from 'react';
export default function ScheduleList({ onAdd, onView }) {
  const schedules = [
    { id: 1, activity: 'Excavation', start: '2025-07-05', end: '2025-07-10', status: 'Completed' },
    { id: 2, activity: 'Foundation', start: '2025-07-12', end: '2025-07-20', status: 'Ongoing' },
  ];
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Schedule</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onAdd}>+ Add Activity</button>
      </div>
      <ul className="divide-y divide-slate-200">
        {schedules.map(sch => (
          <li key={sch.id} className="py-3 flex justify-between items-center hover:bg-blue-50 rounded-xl transition">
            <span className="font-semibold">{sch.activity}</span>
            <span className="text-sm text-slate-500">{sch.start} - {sch.end}</span>
            <span className={`text-xs px-2 py-1 rounded ${sch.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'}`}>{sch.status}</span>
            <button className="ml-4 text-blue-600 underline" onClick={() => onView(sch)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
