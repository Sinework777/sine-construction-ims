import React, { useState } from 'react';
import NewDailyReport from './DailyReports/NewDailyReport';
import DailyReportList from './DailyReports/DailyReportList';
import DailyReportView from './DailyReports/DailyReportView';

export default function DailyReports() {
  const [view, setView] = useState('list');
  const [selectedReport, setSelectedReport] = useState(null);

  function handleAddReport() {
    setView('new');
  }

  function handleViewReport(report) {
    setSelectedReport(report);
    setView('view');
  }

  function handleBackToList() {
    setSelectedReport(null);
    setView('list');
  }

  let content;
  if (view === 'list') {
    content = <DailyReportList onView={handleViewReport} />;
  } else if (view === 'new') {
    content = <NewDailyReport onSubmit={() => setView('list')} onSaveDraft={() => setView('list')} onReset={() => setView('list')} />;
  } else if (view === 'view') {
    content = <DailyReportView report={selectedReport} onBack={handleBackToList} />;
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white/90 max-w-4xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Reports</h2>
        {view === 'list' && (
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={handleAddReport}>+ Add Daily Report</button>
        )}
      </div>
      {content}
    </div>
  );
}
