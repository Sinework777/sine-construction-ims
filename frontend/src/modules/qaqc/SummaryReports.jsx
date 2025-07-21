import React from 'react';
export default function SummaryReports() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">QA/QC Summary Reports</h1>
      <div className="bg-white p-4 rounded shadow mb-4">Bar/Line charts for defect rates, compliance, and analytics (mock).</div>
      <div className="mt-4">Advanced filters: <input className="border p-2 rounded" placeholder="Project, Date, Severity, Category" /></div>
      <div className="mt-4">Export: <button className="bg-yellow-500 text-white px-4 py-2 rounded">PDF</button> <button className="bg-yellow-500 text-white px-4 py-2 rounded">Excel</button></div>
    </div>
  );
}
