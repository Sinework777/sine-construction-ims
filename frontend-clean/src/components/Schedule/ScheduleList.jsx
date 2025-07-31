import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';

export default function ScheduleList({ onAdd, onView }) {
  const { userRole } = useAuth();
  const [error, setError] = useState('');
  const schedules = [
    { id: 1, activity: 'Excavation', start: '2025-07-05', end: '2025-07-10', status: 'Completed' },
    { id: 2, activity: 'Foundation', start: '2025-07-12', end: '2025-07-20', status: 'Ongoing' },
  ];
  const canEdit = ["Planning", "System Admin", "Super Admin"].includes(userRole);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Schedule</h3>
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => canEdit ? onAdd() : setError('You do not have permission to add activities.')}
          disabled={!canEdit}
        >
          + Add Activity
        </button>
      </div>
      {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
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
