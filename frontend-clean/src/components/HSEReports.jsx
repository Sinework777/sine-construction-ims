import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';
import ObservationLog from './HSEReports/ObservationLog';
import IncidentReportForm from './HSEReports/IncidentReportForm';
import ToolboxTalkLog from './HSEReports/ToolboxTalkLog';

export default function HSEReports() {
  const { userRole } = useAuth();
  const [tab, setTab] = useState('observations');
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  function handleAddObservation() {
    if (userRole === 'viewer') {
      setError('You do not have permission to log incidents.');
      return;
    }
    setShowForm(true);
    setTab('form');
  }
  function handleSaveObservation() {
    setShowForm(false);
    setTab('observations');
    setError('');
  }
  function handleCancelForm() {
    setShowForm(false);
    setTab('observations');
    setError('');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">HSE Reports</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-4 flex gap-2">
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'observations' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-blue-700'}`} onClick={() => setTab('observations')}>Safety Observations</button>
        <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'toolbox' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-indigo-700'}`} onClick={() => setTab('toolbox')}>Toolbox Talks</button>
        {(userRole !== 'viewer') && (
          <button className={`px-4 py-2 rounded-xl shadow font-bold transition ${tab === 'form' ? 'bg-green-600 text-white' : 'bg-slate-200 text-green-700'}`} onClick={handleAddObservation}>+ Log Incident/Near Miss</button>
        )}
      </div>
      <div className="mt-4">
        {tab === 'observations' && <ObservationLog userRole={userRole} onAdd={handleAddObservation} />}
        {tab === 'toolbox' && <ToolboxTalkLog userRole={userRole} />}
        {tab === 'form' && showForm && <IncidentReportForm userRole={userRole} onSave={handleSaveObservation} onCancel={handleCancelForm} />}
      </div>
      <div className="text-xs text-slate-500 mt-4">OSHA Reference Fields Included</div>
    </div>
  );
}
