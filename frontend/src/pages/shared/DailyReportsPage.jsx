// Shared DailyReportsPage for all roles
import React, { useState } from 'react';
import DailyReportForm from '../../components/shared/DailyReports/DailyReportForm';
import ReportPreview from '../../components/shared/DailyReports/ReportPreview';
import ReportHistory from '../../components/shared/DailyReports/ReportHistory';
import SafetyChecklist from '../../components/shared/DailyReports/SafetyChecklist';
import { useDailyReports } from '../../components/shared/DailyReports/DailyReportsContext.jsx';

export default function DailyReportsPage() {
  const [activeTab, setActiveTab] = useState('newReport');
  const { reports, addReport, updateReport, deleteReport } = useDailyReports();

  return (
    <div className="p-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daily Reports</h1>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('newReport')}>New Daily Report</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('reportHistory')}>Report History</button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('analytics')}>Analytics</button>
        </div>
      </div>

      {activeTab === 'newReport' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <DailyReportForm addReport={addReport} />
          </div>
          <div>
            <ReportPreview reports={reports} />
          </div>
        </div>
      )}

      {activeTab === 'reportHistory' && (
        <ReportHistory reports={reports} updateReport={updateReport} deleteReport={deleteReport} />
      )}

      {activeTab === 'analytics' && (
        <div>
          {/* Analytics content will go here */}
          <p>Analytics charts for man-hours, equipment usage, delays, etc.</p>
        </div>
      )}

      <div className="fixed bottom-6 right-6 flex flex-col gap-2">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition">⬇ Export PDF</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition">⬇ Export Excel</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">📤 Notify PM</button>
      </div>
    </div>
  );
}
