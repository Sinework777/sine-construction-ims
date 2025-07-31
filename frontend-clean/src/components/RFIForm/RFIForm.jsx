import React, { useState } from 'react';
export default function RFIForm({ onSave, onCancel }) {
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState('Open');
  const [date, setDate] = useState('');
  return (
    <form className="space-y-4 p-4 bg-white rounded-2xl shadow-md" onSubmit={e => { e.preventDefault(); onSave({ subject, status, date }); }}>
      <h3 className="text-xl font-bold mb-2">New RFI</h3>
      <div>
        <label className="block text-sm font-semibold mb-1">Subject</label>
        <input type="text" className="w-full rounded px-3 py-2 border" value={subject} onChange={e => setSubject(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Status</label>
        <select className="w-full rounded px-3 py-2 border" value={status} onChange={e => setStatus(e.target.value)}>
          <option>Open</option>
          <option>Closed</option>
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
