import React, { useState } from 'react';
import BOQList from './BOQ/BOQList';
import BOQForm from './BOQ/BOQForm';
import BOQView from './BOQ/BOQView';

export default function BOQ() {
  const [tab, setTab] = useState('list');
  const [items, setItems] = useState([
    { id: 1, description: 'Concrete (M30)', qty: 120, unit: 'm3', status: 'Verified' },
    { id: 2, description: 'Steel Rebar', qty: 15, unit: 'tons', status: 'Pending' },
  ]);
  const [selected, setSelected] = useState(null);

  function handleAdd() {
    setTab('form');
  }
  function handleSave(item) {
    setItems([...items, { ...item, id: items.length + 1 }]);
    setTab('list');
  }
  function handleCancel() {
    setTab('list');
  }
  function handleView(item) {
    setSelected(item);
    setTab('view');
  }
  function handleBack() {
    setSelected(null);
    setTab('list');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">BOQ</h2>
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>BOQ List</button>
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ Add Item</button>
      </div>
      <div className="mt-4">
        {tab === 'list' && <BOQList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && <BOQForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'view' && <BOQView item={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
