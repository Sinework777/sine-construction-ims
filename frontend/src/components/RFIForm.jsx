import React, { useState } from 'react';
import RFIList from './RFIForm/RFIList';
import RFIForm from './RFIForm/RFIForm';
import RFIView from './RFIForm/RFIView';

export default function RFIFormModule() {
  const [tab, setTab] = useState('list');
  const [rfis, setRFIs] = useState([
    { id: 1, subject: 'Clarify wall finish', status: 'Open', date: '2025-07-10' },
    { id: 2, subject: 'Window spec update', status: 'Closed', date: '2025-07-12' },
  ]);
  const [selected, setSelected] = useState(null);

  function handleAdd() {
    setTab('form');
  }
  function handleSave(rfi) {
    setRFIs([...rfis, { ...rfi, id: rfis.length + 1 }]);
    setTab('list');
  }
  function handleCancel() {
    setTab('list');
  }
  function handleView(rfi) {
    setSelected(rfi);
    setTab('view');
  }
  function handleBack() {
    setSelected(null);
    setTab('list');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">RFIs</h2>
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>RFI List</button>
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ New RFI</button>
      </div>
      <div className="mt-4">
        {tab === 'list' && <RFIList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && <RFIForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'view' && <RFIView rfi={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
