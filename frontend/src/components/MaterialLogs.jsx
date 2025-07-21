import React, { useState } from 'react';
import MaterialLogList from './MaterialLogs/MaterialLogList';
import MaterialLogForm from './MaterialLogs/MaterialLogForm';
import MaterialLogView from './MaterialLogs/MaterialLogView';

export default function MaterialLogs() {
  const [tab, setTab] = useState('list');
  const [logs, setLogs] = useState([
    { id: 1, material: 'Cement', qty: 50, unit: 'bags', status: 'Received', date: '2025-07-14' },
    { id: 2, material: 'Sand', qty: 20, unit: 'tons', status: 'Pending', date: '2025-07-16' },
  ]);
  const [selected, setSelected] = useState(null);

  function handleAdd() {
    setTab('form');
  }
  function handleSave(log) {
    setLogs([...logs, { ...log, id: logs.length + 1 }]);
    setTab('list');
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
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>Log List</button>
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ Add Log</button>
      </div>
      <div className="mt-4">
        {tab === 'list' && <MaterialLogList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && <MaterialLogForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'view' && <MaterialLogView log={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
