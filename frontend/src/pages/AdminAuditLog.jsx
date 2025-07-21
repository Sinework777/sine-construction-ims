import React from 'react';
import { useState } from 'react';
const initialLogs = [
  { id: 1, user: 'Alice Admin', action: 'Added user Bob', date: '2025-07-20' },
  { id: 2, user: 'Bob PM', action: 'Edited project Alpha', date: '2025-07-19' },
];
export default function AdminAuditLog() {
  const [logs, setLogs] = useState(initialLogs);
  const [filter, setFilter] = useState('');
  function handleExport() {
    alert('Exported log!');
  }
  const filteredLogs = logs.filter(l => l.user.toLowerCase().includes(filter.toLowerCase()));
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Audit Log</h2>
      <div className="mb-4 flex gap-2">
        <input className="border px-2 py-1" placeholder="Filter by user" value={filter} onChange={e => setFilter(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleExport}>Export Log</button>
      </div>
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
    </div>
  );
}
