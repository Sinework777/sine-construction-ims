import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import MaterialLogList from './MaterialLogs/MaterialLogList';
import MaterialLogForm from './MaterialLogs/MaterialLogForm';
import MaterialLogView from './MaterialLogs/MaterialLogView';

export default function MaterialLogs() {
  const { userRole } = useAuth();
  const [tab, setTab] = useState('list');
  const [logs, setLogs] = useState([
    { id: 1, material: 'Cement', qty: 50, unit: 'bags', status: 'Received', date: '2025-07-14' },
    { id: 2, material: 'Sand', qty: 20, unit: 'tons', status: 'Pending', date: '2025-07-16' },
  ]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  function handleAdd() {
    setTab('form');
  }
  function handleSave(log) {
    try {
      setLogs([...logs, { ...log, id: logs.length + 1 }]);
      setTab('list');
      setError('');
    } catch {
      setError('Failed to save material log.');
    }
  }
  function handleCancel() {
    setTab('list');
  }
  function handleView(log) {
    setSelected(log);
    setTab('view');
  }
  function handleBack() {
    setSelected(null);
    setTab('list');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Material Logs</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>Log List</button>
        {(userRole === 'admin' || userRole === 'supervisor') && (
          <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ Add Log</button>
        )}
      </div>
      <div className="mt-4">
        {tab === 'list' && <MaterialLogList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && (userRole === 'admin' || userRole === 'supervisor') && <MaterialLogForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'form' && userRole === 'viewer' && <div className="text-red-500">You do not have permission to add material logs.</div>}
        {tab === 'view' && <MaterialLogView log={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
