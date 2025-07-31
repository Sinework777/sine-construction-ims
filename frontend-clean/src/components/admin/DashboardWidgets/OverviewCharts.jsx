// Dashboard overview charts widget
import React from 'react';
// TODO: Connect to Firestore for live stats
export default function OverviewCharts() {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">System Overview</h2>
      {/* Example: Replace with real charts */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="font-semibold">Active Projects</div>
          <div className="text-blue-600 font-bold text-xl">12</div>
        </div>
        <div>
          <div className="font-semibold">Active Users</div>
          <div className="text-green-600 font-bold text-xl">42</div>
        </div>
      </div>
    </div>
  );
}
