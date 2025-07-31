import React, { useState } from 'react';
import NCRForm from './QAQCReports/NCRForm';
import DeficiencyLog from './QAQCReports/DeficiencyLog';
import InspectionChecklist from './QAQCReports/InspectionChecklist';

export default function QAQCReports() {
  const [active, setActive] = useState('main');
  // Optionally, you can pass handlers to submodules for save/cancel
  function handleBack() {
    setActive('main');
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">QA/QC Reports</h2>
      {active === 'main' && (
        <>
          <div className="mb-4 flex gap-2">
            <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded-xl shadow hover:bg-blue-700 transition" onClick={() => setActive('ncr')}>+ Add NCR</button>
            <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-xl shadow hover:bg-green-700 transition">Export Reports</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-slate-100 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">NCR Log</h3>
              <div className="text-sm text-red-600">Active: 2</div>
              <div className="text-sm text-green-600">Closed: 5</div>
              <button className="mt-2 bg-blue-600 text-white font-bold py-1 px-3 rounded shadow hover:bg-blue-700 transition" onClick={() => setActive('ncr')}>View/Add NCR</button>
            </div>
            <div className="bg-slate-100 rounded-xl p-4 shadow">
              <h3 className="font-semibold mb-2">Inspection Checklists</h3>
              <button className="bg-indigo-600 text-white font-bold py-1 px-3 rounded shadow hover:bg-indigo-700 transition" onClick={() => setActive('checklist')}>Upload/View Checklist</button>
            </div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 shadow mb-4">
            <h3 className="font-semibold mb-2">Deficiency Tracking</h3>
            <button className="bg-yellow-500 text-white font-bold py-1 px-3 rounded shadow hover:bg-yellow-600 transition" onClick={() => setActive('deficiency')}>Track/View Deficiency</button>
          </div>
          <div className="text-xs text-slate-500">Signature/Approval Flow Enabled</div>
        </>
      )}
      {active === 'ncr' && (
        <div>
          <button className="mb-4 bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={handleBack}>Back</button>
          <NCRForm onSave={handleBack} onCancel={handleBack} />
        </div>
      )}
      {active === 'deficiency' && (
        <div>
          <button className="mb-4 bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={handleBack}>Back</button>
          <DeficiencyLog />
        </div>
      )}
      {active === 'checklist' && (
        <div>
          <button className="mb-4 bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={handleBack}>Back</button>
          <InspectionChecklist />
        </div>
      )}
    </div>
  );
}
