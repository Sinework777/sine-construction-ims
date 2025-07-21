import React, { useState } from 'react';
import MinutesList from './MeetingMinutes/MinutesList';
import MinutesForm from './MeetingMinutes/MinutesForm';
import MinutesView from './MeetingMinutes/MinutesView';

export default function MeetingMinutes() {
  const [tab, setTab] = useState('list');
  const [minutes, setMinutes] = useState([
    { id: 1, title: 'Kickoff Meeting', date: '2025-07-01', status: 'Finalized' },
    { id: 2, title: 'Progress Review', date: '2025-07-15', status: 'Draft' },
  ]);
  const [selected, setSelected] = useState(null);

  function handleAdd() {
    setTab('form');
  }
  function handleSave(min) {
    setMinutes([...minutes, { ...min, id: minutes.length + 1 }]);
    setTab('list');
  }
  function handleCancel() {
    setTab('list');
  }
  function handleView(min) {
    setSelected(min);
    setTab('view');
  }
  function handleBack() {
    setSelected(null);
    setTab('list');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Meeting Minutes</h2>
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>Minutes List</button>
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ Add Minutes</button>
      </div>
      <div className="mt-4">
        {tab === 'list' && <MinutesList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && <MinutesForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'view' && <MinutesView minutes={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
