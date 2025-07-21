import React, { useState } from 'react';
export default function ScheduleForm({ onSave, onCancel }) {
  const [activity, setActivity] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [status, setStatus] = useState('Ongoing');
  return (
    <form className="space-y-4 p-4 bg-white rounded-2xl shadow-md" onSubmit={e => { e.preventDefault(); onSave({ activity, start, end, status }); }}>
      <h3 className="text-xl font-bold mb-2">Add Activity</h3>
      <div>
        <label className="block text-sm font-semibold mb-1">Activity</label>
        <input type="text" className="w-full rounded px-3 py-2 border" value={activity} onChange={e => setActivity(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Start Date</label>
        <input type="date" className="w-full rounded px-3 py-2 border" value={start} onChange={e => setStart(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">End Date</label>
        <input type="date" className="w-full rounded px-3 py-2 border" value={end} onChange={e => setEnd(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Status</label>
        <select className="w-full rounded px-3 py-2 border" value={status} onChange={e => setStatus(e.target.value)}>
          <option>Ongoing</option>
          <option>Completed</option>
        </select>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Save</button>
        <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
