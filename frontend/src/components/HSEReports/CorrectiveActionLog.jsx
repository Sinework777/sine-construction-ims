import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export default function CorrectiveActionLog() {
  const [actions, setActions] = useState([]);
  const [form, setForm] = useState({
    item: '',
    assignedTo: '',
    dueDate: '',
    status: 'Open',
  });
  const [showForm, setShowForm] = useState(false);

  function handleInput(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setActions([...actions, { ...form, id: actions.length + 1 }]);
    setForm({ item: '', assignedTo: '', dueDate: '', status: 'Open' });
    setShowForm(false);
  }

  function handleStatusChange(id, status) {
    setActions(actions.map(a => a.id === id ? { ...a, status } : a));
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Corrective Action Log</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition flex items-center gap-2" onClick={() => setShowForm(true)}><AiOutlinePlus /> Add Action</button>
      </div>
      {showForm && (
        <form className="bg-white p-4 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">Action Item</label>
            <input type="text" name="item" className="w-full rounded px-3 py-2 border" value={form.item} onChange={handleInput} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Assigned To</label>
            <input type="text" name="assignedTo" className="w-full rounded px-3 py-2 border" value={form.assignedTo} onChange={handleInput} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Due Date</label>
            <input type="date" name="dueDate" className="w-full rounded px-3 py-2 border" value={form.dueDate} onChange={handleInput} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select name="status" className="w-full rounded px-3 py-2 border" value={form.status} onChange={handleInput} required>
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
        {actions.map(action => (
          <li key={action.id} className="py-3 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-blue-50 rounded-xl transition">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center w-full">
              <span className="font-semibold">{action.item}</span>
              <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">Assigned: {action.assignedTo}</span>
              <span className="text-xs text-slate-400">Due: {action.dueDate}</span>
              <span className={`text-xs px-2 py-1 rounded ${action.status === 'Open' ? 'bg-yellow-100 text-yellow-600' : action.status === 'In Progress' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>{action.status}</span>
              <select className="rounded px-2 py-1 border ml-2" value={action.status} onChange={e => handleStatusChange(action.id, e.target.value)}>
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
