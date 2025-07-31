// Dashboard quick actions widget
import React from 'react';
export default function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Quick Actions</h2>
      <div className="flex flex-wrap gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">+ New Project</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">+ New User</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Run Report</button>
      </div>
    </div>
  );
}
