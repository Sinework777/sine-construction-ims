import React, { useState } from 'react';
import SpecList from './Specifications/SpecList';
import SpecForm from './Specifications/SpecForm';
import SpecView from './Specifications/SpecView';

export default function Specifications() {
  const [tab, setTab] = useState('list');
  const [specs, setSpecs] = useState([
    { id: 1, name: 'Concrete Spec', status: 'Active', date: '2025-07-10' },
    { id: 2, name: 'Steel Spec', status: 'Obsolete', date: '2025-07-12' },
  ]);
  const [selected, setSelected] = useState(null);

  function handleAdd() {
    setTab('form');
  }
  function handleSave(spec) {
    setSpecs([...specs, { ...spec, id: specs.length + 1 }]);
    setTab('list');
  }
  function handleCancel() {
    setTab('list');
  }
  function handleView(spec) {
    setSelected(spec);
    setTab('view');
  }
  function handleBack() {
    setSelected(null);
    setTab('list');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Specifications</h2>
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>Spec List</button>
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ Add Spec</button>
      </div>
      <div className="mt-4">
        {tab === 'list' && <SpecList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && <SpecForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'view' && <SpecView spec={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
