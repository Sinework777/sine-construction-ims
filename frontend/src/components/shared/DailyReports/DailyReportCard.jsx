// Shared DailyReportCard for Daily Reports
import React from 'react';

export default function DailyReportCard({ report, userRole, onComment }) {
  // ...existing card logic
  // Show comment thread if allowed
  // Minor UI tweaks per role
  const roleStyles = {
    pm: 'border-blue-500',
    qaqc: 'border-green-500',
    superintendent: 'border-orange-500',
    hse: 'border-red-500',
  };
  // Only show comment thread for PM, QAQC, Superintendent
  const canComment = ['pm','qaqc','superintendent'].includes(userRole);
  return (
    <div className={`card border-2 rounded-xl p-4 mb-2 ${roleStyles[userRole] || 'border-gray-300'}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-lg">{report.title || report.date}</div>
        <span className={`px-3 py-1 rounded-xl text-xs font-bold ${report.status==='Submitted'?'bg-green-200 text-green-800':report.status==='Draft'?'bg-yellow-200 text-yellow-800':'bg-gray-200 text-gray-800'}`}>{report.status}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
        <div><span className="font-semibold">Project:</span> {report.project}</div>
        <div><span className="font-semibold">Date:</span> {report.date}</div>
        <div><span className="font-semibold">Crew:</span> {report.crewCount}</div>
        <div><span className="font-semibold">Weather:</span> {report.weather}</div>
        <div><span className="font-semibold">Work:</span> {report.workCompleted}</div>
        <div><span className="font-semibold">Safety:</span> {report.safetyObservations}</div>
        <div><span className="font-semibold">Delays:</span> {report.delays}</div>
      </div>
      {canComment && (
        <div className="comments mt-2">
          <div className="font-bold mb-1">Comments</div>
          {/* Example comment thread UI */}
          <div className="bg-slate-100 rounded-xl p-2 mb-1 text-sm">QAQC: Please clarify weather data.</div>
          <div className="bg-slate-100 rounded-xl p-2 mb-1 text-sm">PM: Updated as requested.</div>
          <textarea className="input w-full mt-2" placeholder="Add a comment..." />
          <button className="btn-primary mt-2">Post</button>
        </div>
      )}
    </div>
  );
}
