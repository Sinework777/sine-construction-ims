import React, { useState } from 'react';
import QSList from './QuantitySurvey/QSList';
import QSForm from './QuantitySurvey/QSForm';
import QSView from './QuantitySurvey/QSView';

export default function QuantitySurvey() {
  const [tab, setTab] = useState('list');
  const [surveys, setSurveys] = useState([
    { id: 1, name: 'Site Measurement', status: 'Completed', date: '2025-07-11' },
    { id: 2, name: 'Material Check', status: 'Pending', date: '2025-07-13' },
  ]);
  const [selected, setSelected] = useState(null);

  function handleAdd() {
    setTab('form');
  }
  function handleSave(survey) {
    setSurveys([...surveys, { ...survey, id: surveys.length + 1 }]);
    setTab('list');
  }
  function handleCancel() {
    setTab('list');
  }
  function handleView(survey) {
    setSelected(survey);
    setTab('view');
  }
  function handleBack() {
    setSelected(null);
    setTab('list');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Quantity Survey</h2>
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'list' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('list')}>Survey List</button>
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAdd}>+ New Survey</button>
      </div>
      <div className="mt-4">
        {tab === 'list' && <QSList onAdd={handleAdd} onView={handleView} />}
        {tab === 'form' && <QSForm onSave={handleSave} onCancel={handleCancel} />}
        {tab === 'view' && <QSView survey={selected} onBack={handleBack} />}
      </div>
    </div>
  );
}
