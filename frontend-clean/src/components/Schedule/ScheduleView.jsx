import React from 'react';
export default function ScheduleView({ activity, onBack }) {
  if (!activity) return null;
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mb-4">
      <h3 className="text-xl font-bold mb-2">Activity Details</h3>
      <div className="mb-2"><span className="font-semibold">Activity:</span> {activity.activity}</div>
      <div className="mb-2"><span className="font-semibold">Start:</span> {activity.start}</div>
      <div className="mb-2"><span className="font-semibold">End:</span> {activity.end}</div>
      <div className="mb-2"><span className="font-semibold">Status:</span> {activity.status}</div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onBack}>Back</button>
    </div>
  );
}
