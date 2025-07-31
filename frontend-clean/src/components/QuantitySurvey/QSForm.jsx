import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';

export default function QSForm({ onSave, onCancel }) {
  const { userRole } = useAuth();
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Pending');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const canEdit = ["QS", "System Admin", "Super Admin"].includes(userRole);

  function handleSubmit(e) {
    e.preventDefault();
    if (!canEdit) {
      setError('You do not have permission to add surveys.');
      return;
    }
    try {
      onSave({ name, status, date });
      setError('');
    } catch {
      setError('Failed to save survey. Please try again.');
    }
  }

  return (
    <form className="space-y-4 p-4 bg-white rounded-2xl shadow-md" onSubmit={handleSubmit}>
      <h3 className="text-xl font-bold mb-2">New Survey</h3>
      {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
      <div>
        <label className="block text-sm font-semibold mb-1">Name</label>
        <input type="text" className="w-full rounded px-3 py-2 border" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Status</label>
        <select className="w-full rounded px-3 py-2 border" value={status} onChange={e => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>Completed</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Date</label>
        <input type="date" className="w-full rounded px-3 py-2 border" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className={`bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!canEdit}>Save</button>
        <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
