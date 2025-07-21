import React, { useState } from 'react';
export default function DailyReportForm({ onSave, onCancel }) {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState('');
  const [manpower, setManpower] = useState('');
  return (
    <form className="space-y-4 p-4 bg-white rounded-2xl shadow-md" onSubmit={e => { e.preventDefault(); onSave({ date, weather, manpower }); }}>
      <h3 className="text-xl font-bold mb-2">Add/Edit Daily Report</h3>
      <div>
        <label className="block text-sm font-semibold mb-1">Date</label>
        <input type="date" className="w-full rounded px-3 py-2 border" value={date} onChange={e => setDate(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Weather</label>
        <input type="text" className="w-full rounded px-3 py-2 border" value={weather} onChange={e => setWeather(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Manpower</label>
        <input type="number" className="w-full rounded px-3 py-2 border" value={manpower} onChange={e => setManpower(e.target.value)} required />
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Save</button>
        <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
