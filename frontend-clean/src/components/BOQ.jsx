import React, { useState } from 'react';
import BOQList from './BOQ/BOQList';
import BOQForm from './BOQ/BOQForm';
import BOQView from './BOQ/BOQView';
import { useAuth } from '../context/useAuth';

export default function BOQ() {
  const { userRole } = useAuth();
  const [tab, setTab] = useState('list');
  const [items, setItems] = useState([
    { id: 1, description: 'Concrete (M30)', qty: 120, unit: 'm3', status: 'Verified' },
    { id: 2, description: 'Steel Rebar', qty: 15, unit: 'tons', status: 'Pending' },
  ]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  const canEdit = ["System Admin", "Super Admin", "PM"].includes(userRole);

  function handleAdd() {
    if (!canEdit) {
      setError('You do not have permission to add BOQ items.');
      return;
    }
    setError('');
    setTab('form');
  }
  function handleSave(item) {
    try {
      setItems([...items, { ...item, id: items.length + 1 }]);
      setTab('list');
      setError('');
    } catch {
      setError('Failed to add item. Please try again.');
    }
  }
  function handleCancel() {
    setTab('list');
    setError('');
  }
  function handleView(item) {
    try {
      setSelected(item);
      setTab('view');
      setError('');
    } catch {
      setError('Failed to load item details.');
    }
  }
  function handleBack() {
    setSelected(null);
    setTab('list');
    setError('');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">BOQ</h2>
      {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>BOQ List</button>
        <button
          className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'} ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleAdd}
          disabled={!canEdit}
        >
          + Add Item
        </button>
      </div>
      <div className="mt-4">
        {tab === 'list' && <BOQList items={items} onAdd={handleAdd} onView={handleView} canEdit={canEdit} />}
        {tab === 'form' && <BOQForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'view' && <BOQView item={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
