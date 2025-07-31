import React, { useState } from 'react';
export default function SpecForm({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('Active');
  const [date, setDate] = useState('');
  return (
    <form className="space-y-4 p-4 bg-white rounded-2xl shadow-md" onSubmit={e => { e.preventDefault(); onSave({ name, status, date }); }}>
      <h3 className="text-xl font-bold mb-2">Add Specification</h3>
      <div>
        <label className="block text-sm font-semibold mb-1">Name</label>
        <input type="text" className="w-full rounded px-3 py-2 border" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Status</label>
        <select className="w-full rounded px-3 py-2 border" value={status} onChange={e => setStatus(e.target.value)}>
          <option>Active</option>
          <option>Obsolete</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Date</label>
        <input type="date" className="w-full rounded px-3 py-2 border" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Save</button>
        <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
