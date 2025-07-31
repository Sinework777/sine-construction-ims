import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';

export default function AdminAuditLog() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'green' });

  const fetchLogs = () => {
    setLoading(true);
    axios.get('/api/audit-logs')
      .then(res => {
        setLogs(res.data);
        setError(null);
      })
      .catch(() => setError('Failed to load audit logs.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  function handleExport() {
    // Simple CSV export
    const csv = ['User,Action,Date', ...logs.map(l => `${l.user},${l.action},${l.date}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'audit-log.csv';
    a.click();
    setSnackbar({ open: true, message: 'Exported log!', color: 'green' });
  }

  const filteredLogs = logs.filter(l => l.user.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Audit Log</h2>
      <div className="mb-4 flex gap-2">
        <input className="border px-2 py-1" placeholder="Filter by user" value={filter} onChange={e => setFilter(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleExport}>Export Log</button>
      </div>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-red-600 py-4">{error}</div>
      ) : (
        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">User</th>
              <th className="p-2">Action</th>
              <th className="p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(l => (
              <tr key={l.id}>
                <td className="p-2">{l.user}</td>
                <td className="p-2">{l.action}</td>
                <td className="p-2">{l.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {snackbar.open && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white ${snackbar.color === 'green' ? 'bg-green-600' : 'bg-red-600'}`}>{snackbar.message}</div>
      )}
    </div>
  );
}
