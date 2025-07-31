// Shared DailyReportList for Daily Reports
import React from 'react';
import DailyReportCard from './DailyReportCard';

export default function DailyReportList({ reports, userRole, onComment }) {
  // ...existing logic, tabs, export, etc.
  // Tabs: Today, This Week, All
  const [tab, setTab] = React.useState('Today');
  const today = new Date().toISOString().split('T')[0];
  const weekAgo = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  let filtered = reports;
  if (tab === 'Today') filtered = reports.filter(r => r.date === today);
  if (tab === 'This Week') filtered = reports.filter(r => r.date >= weekAgo);
  // Group by project
  const grouped = filtered.reduce((acc, r) => {
    acc[r.project] = acc[r.project] || [];
    acc[r.project].push(r);
    return acc;
  }, {});
  return (
    <div>
      <div className="flex gap-2 mb-4">
        {['Today','This Week','All'].map(t => (
          <button key={t} className={`px-4 py-2 rounded-xl font-bold ${tab===t?'bg-blue-600 text-white':'bg-slate-200 text-slate-700'}`} onClick={()=>setTab(t)}>{t}</button>
        ))}
        <button className="ml-auto bg-green-600 text-white px-4 py-2 rounded-xl font-bold" onClick={()=>alert('Export PDF')}>Export PDF</button>
        <button className="bg-green-600 text-white px-4 py-2 rounded-xl font-bold" onClick={()=>alert('Export Excel')}>Export Excel</button>
      </div>
      {Object.entries(grouped).map(([project, projectReports]) => (
        <div key={project} className="mb-6">
          <div className="font-bold text-lg mb-2">{project}</div>
          {projectReports.map(report => (
            <DailyReportCard key={report.id} report={report} userRole={userRole} onComment={onComment} />
          ))}
        </div>
      ))}
    </div>
  );
}
