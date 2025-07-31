import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserManagementAuditLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      setError('');
      try {
        // Replace with your actual API endpoint for user management audit logs
        const res = await axios.get('/api/admin/user-management-audit-logs');
        setLogs(res.data);
      } catch {
        setError('Failed to load audit logs.');
      }
      setLoading(false);
    }
    fetchLogs();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <h2 className="text-lg font-bold mb-2">User Management Audit Log</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-slate-100">
                <th className="px-3 py-2 text-left">Action</th>
                <th className="px-3 py-2 text-left">User</th>
                <th className="px-3 py-2 text-left">Target</th>
                <th className="px-3 py-2 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-4 text-slate-400">No audit log entries found.</td></tr>
              ) : (
                logs.map(log => (
                  <tr key={log.id} className="border-b last:border-0">
                    <td className="px-3 py-2">{log.action}</td>
                    <td className="px-3 py-2">{log.user}</td>
                    <td className="px-3 py-2">{log.target}</td>
                    <td className="px-3 py-2">{new Date(log.timestamp).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
