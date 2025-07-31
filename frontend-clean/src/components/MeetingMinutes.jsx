import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import MinutesList from './MeetingMinutes/MinutesList';
import MinutesForm from './MeetingMinutes/MinutesForm';
import MinutesView from './MeetingMinutes/MinutesView';

export default function MeetingMinutes() {
  const { userRole } = useAuth();
  const [tab, setTab] = useState('list');
  const [minutes, setMinutes] = useState([
    { id: 1, title: 'Kickoff Meeting', date: '2025-07-01', status: 'Finalized' },
    { id: 2, title: 'Progress Review', date: '2025-07-15', status: 'Draft' },
  ]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  function handleAdd() {
    if (userRole !== 'admin' && userRole !== 'pm') {
      setError('You do not have permission to add meeting minutes.');
      return;
    }
    setTab('form');
    setError('');
  }
  function handleSave(min) {
    try {
      setMinutes([...minutes, { ...min, id: minutes.length + 1 }]);
      setTab('list');
      setError('');
    } catch {
      setError('Failed to save meeting minutes.');
    }
  }
  function handleCancel() {
    setTab('list');
    setError('');
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
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>Minutes List</button>
        {(userRole === 'admin' || userRole === 'pm') && (
          <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ Add Minutes</button>
        )}
      </div>
      <div className="mt-4">
        {tab === 'list' && <MinutesList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && (userRole === 'admin' || userRole === 'pm') && <MinutesForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'form' && userRole !== 'admin' && userRole !== 'pm' && <div className="text-red-500">You do not have permission to add meeting minutes.</div>}
        {tab === 'view' && <MinutesView minutes={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
