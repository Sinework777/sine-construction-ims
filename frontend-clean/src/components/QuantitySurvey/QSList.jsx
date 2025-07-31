import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';

export default function QSList({ onAdd, onView }) {
  const { userRole } = useAuth();
  const [error, setError] = useState('');
  const surveys = [
    { id: 1, name: 'Site Measurement', status: 'Completed', date: '2025-07-11' },
    { id: 2, name: 'Material Check', status: 'Pending', date: '2025-07-13' },
  ];
  const canEdit = ["QS", "System Admin", "Super Admin"].includes(userRole);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Quantity Surveys</h3>
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => canEdit ? onAdd() : setError('You do not have permission to add surveys.')}
          disabled={!canEdit}
        >
          + New Survey
        </button>
      </div>
      {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
      <ul className="divide-y divide-slate-200">
        {surveys.map(survey => (
          <li key={survey.id} className="py-3 flex justify-between items-center hover:bg-blue-50 rounded-xl transition">
            <span className="font-semibold">{survey.name}</span>
            <span className={`text-xs px-2 py-1 rounded ${survey.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'}`}>{survey.status}</span>
            <span className="text-sm text-slate-500">{survey.date}</span>
            <button className="ml-4 text-blue-600 underline" onClick={() => onView(survey)}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
