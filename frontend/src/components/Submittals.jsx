import React, { useState } from 'react';
import SubmittalList from './Submittals/SubmittalList';
import SubmittalForm from './Submittals/SubmittalForm';
import SubmittalView from './Submittals/SubmittalView';

export default function Submittals() {
  const [tab, setTab] = useState('list');
  const [submittals, setSubmittals] = useState([
    { id: 1, title: 'Concrete Mix Design', status: 'Approved', date: '2025-07-15' },
    { id: 2, title: 'Steel Rebar Specs', status: 'Pending', date: '2025-07-18' },
  ]);
  const [selected, setSelected] = useState(null);

  function handleAdd() {
    setTab('form');
  }
  function handleSave(sub) {
    setSubmittals([...submittals, { ...sub, id: submittals.length + 1 }]);
    setTab('list');
  }
  function handleCancel() {
    setTab('list');
  }
  function handleView(sub) {
    setSelected(sub);
    setTab('view');
  }
  function handleBack() {
    setSelected(null);
    setTab('list');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submittals</h2>
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>Submittal List</button>
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ New Submittal</button>
      </div>
      <div className="mt-4">
        {tab === 'list' && <SubmittalList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && <SubmittalForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'view' && <SubmittalView submittal={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
