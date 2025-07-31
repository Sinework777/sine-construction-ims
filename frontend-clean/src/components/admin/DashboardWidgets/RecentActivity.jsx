// Dashboard recent activity feed widget
import React from 'react';
export default function RecentActivity() {
  // TODO: Connect to Firestore audit logs
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="text-lg font-bold mb-2">Recent Activity</h2>
      <ul className="text-sm text-gray-700">
        <li>User John Doe created Project Alpha (2 min ago)</li>
        <li>Admin Jane approved user request (5 min ago)</li>
        <li>Backup completed (10 min ago)</li>
      </ul>
    </div>
  );
}
