import React from 'react';
export default function ScheduleDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Schedule Dashboard</h1>
      <div className="mb-4">% Completion: <span className="font-bold text-green-600">72%</span></div>
      <div className="mb-4">Upcoming Tasks & Alerts</div>
      <div className="bg-white p-4 rounded shadow mb-4">Gantt chart and summary will appear here.</div>
    </div>
  );
}
