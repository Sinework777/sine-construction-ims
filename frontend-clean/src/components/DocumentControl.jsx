import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import DocumentList from './DocumentControl/DocumentList';
import DocumentForm from './DocumentControl/DocumentForm';
import DocumentView from './DocumentControl/DocumentView';

export default function DocumentControl() {
  const { userRole } = useAuth();
  const [tab, setTab] = useState('list');
  const [docs, setDocs] = useState([
    { id: 1, name: 'Site Plan.pdf', type: 'Drawing', status: 'Current', date: '2025-07-10' },
    { id: 2, name: 'Specs.docx', type: 'Specification', status: 'Obsolete', date: '2025-07-12' },
  ]);
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  function handleAdd() {
    if (userRole !== 'admin' && userRole !== 'pm') {
      setError('You do not have permission to add documents.');
      return;
    }
    setTab('form');
    setError('');
  }
  function handleSave(doc) {
    try {
      setDocs([...docs, { ...doc, id: docs.length + 1 }]);
      setTab('list');
      setError('');
    } catch {
      setError('Failed to save document.');
    }
  }
  function handleCancel() {
    setTab('list');
    setError('');
  }
  function handleView(doc) {
    setSelected(doc);
    setTab('view');
  }
  function handleBack() {
    setSelected(null);
    setTab('list');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Document Control</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>Document List</button>
        {(userRole === 'admin' || userRole === 'pm') && (
          <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ Add Document</button>
        )}
      </div>
      <div className="mt-4">
        {tab === 'list' && <DocumentList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && (userRole === 'admin' || userRole === 'pm') && <DocumentForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'form' && userRole !== 'admin' && userRole !== 'pm' && <div className="text-red-500">You do not have permission to add documents.</div>}
        {tab === 'view' && <DocumentView doc={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
