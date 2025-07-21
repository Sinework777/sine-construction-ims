import React from 'react';

export default function ReportCard({ report }) {
  return (
    <div className="rounded-xl border shadow p-4 bg-blue-50">
      <div className="flex justify-between items-center mb-2">
        <div className="font-bold text-lg text-blue-800">{report.id}</div>
        <span className={`px-3 py-1 rounded-xl text-xs font-bold ${report.status === 'Submitted' ? 'bg-green-200 text-green-800' : report.status === 'Draft' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>{report.status}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div><span className="font-semibold">Date:</span> {report.date}</div>
        <div><span className="font-semibold">Weather:</span> {report.weather}</div>
        <div><span className="font-semibold">Crew:</span> {report.crewCount}</div>
        <div><span className="font-semibold">Site:</span> {report.siteCondition}</div>
        <div><span className="font-semibold">Materials:</span> {report.materialsDelivered}</div>
        <div><span className="font-semibold">Work:</span> {report.workCompleted}</div>
        <div><span className="font-semibold">Delays:</span> {report.delays}</div>
        <div><span className="font-semibold">Safety:</span> {report.safetyObservations}</div>
      </div>
      <div className="mt-2 text-xs text-slate-600">Reviewer: {report.reviewer || 'Pending'}</div>
    </div>
  );
}
