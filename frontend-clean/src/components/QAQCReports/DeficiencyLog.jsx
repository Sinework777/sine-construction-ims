import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';

export default function DeficiencyLog() {
  const { userRole } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ description: '', deadline: '', status: 'Open' });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const canEdit = ["QAQC", "System Admin", "Super Admin"].includes(userRole);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!canEdit) {
      setError('You do not have permission to add deficiencies.');
      return;
    }
    try {
      setItems([...items, { ...form, id: items.length + 1 }]);
      setForm({ description: '', deadline: '', status: 'Open' });
      setShowForm(false);
      setError('');
    } catch {
      setError('Failed to add deficiency. Please try again.');
    }
  }

  function handleStatusChange(id, status) {
    if (!canEdit) {
      setError('You do not have permission to update status.');
      return;
    }
    try {
      setItems(items.map(item => item.id === id ? { ...item, status } : item));
      setError('');
    } catch {
      setError('Failed to update status.');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Deficiency Log</h3>
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => canEdit ? setShowForm(true) : setError('You do not have permission to add deficiencies.')}
          disabled={!canEdit}
        >
          Add Deficiency
        </button>
      </div>
      {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
      {showForm && (
        <form className="bg-white p-4 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <input type="text" name="description" className="w-full rounded px-3 py-2 border" value={form.description} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Response Deadline</label>
            <input type="date" name="deadline" className="w-full rounded px-3 py-2 border" value={form.deadline} onChange={handleInputChange} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select name="status" className="w-full rounded px-3 py-2 border" value={form.status} onChange={handleInputChange} required>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="md:col-span-2 flex gap-4 justify-end mt-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Save</button>
            <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
      <ul className="divide-y divide-slate-200">
        {items.map(item => (
          <li key={item.id} className="py-3 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-blue-50 rounded-xl transition">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center w-full">
              <span className="font-semibold">{item.description}</span>
              <span className="text-xs text-slate-400">Deadline: {item.deadline}</span>
              <span className={`text-xs px-2 py-1 rounded ${item.status === 'Open' ? 'bg-yellow-100 text-yellow-600' : item.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>{item.status}</span>
              <select
                className={`rounded px-2 py-1 border ml-2 ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
                value={item.status}
                onChange={e => handleStatusChange(item.id, e.target.value)}
                disabled={!canEdit}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
