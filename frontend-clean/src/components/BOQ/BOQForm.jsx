import React, { useState } from 'react';
export default function BOQForm({ onSave, onCancel }) {
  const [description, setDescription] = useState('');
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState('m3');
  const [status, setStatus] = useState('Pending');
  return (
    <form className="space-y-4 p-4 bg-white rounded-2xl shadow-md" onSubmit={e => { e.preventDefault(); onSave({ description, qty, unit, status }); }}>
      <h3 className="text-xl font-bold mb-2">Add BOQ Item</h3>
      <div>
        <label className="block text-sm font-semibold mb-1">Description</label>
        <input type="text" className="w-full rounded px-3 py-2 border" value={description} onChange={e => setDescription(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Quantity</label>
        <input type="number" className="w-full rounded px-3 py-2 border" value={qty} onChange={e => setQty(e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Unit</label>
        <select className="w-full rounded px-3 py-2 border" value={unit} onChange={e => setUnit(e.target.value)}>
          <option>m3</option>
          <option>tons</option>
          <option>pcs</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-semibold mb-1">Status</label>
        <select className="w-full rounded px-3 py-2 border" value={status} onChange={e => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>Verified</option>
        </select>
      </div>
      <div className="flex gap-2 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Save</button>
        <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
