import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AuditLogViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      const res = await axios.get('/api/admin/audit-logs');
      setLogs(res.data);
      setLoading(false);
    }
    fetchLogs();
  }, []);

  if (loading) return <div>Loading audit logs...</div>;

  return (
    <div>
      <h2>Audit Log Viewer</h2>
      <p>View all permission changes and access events here.</p>
      <ul>
        {logs.map(l => (
          <li key={l.id}>
            {l.action} by {l.user} at {l.timestamp}
            {/* TODO: Add filtering/export */}
          </li>
        ))}
      </ul>
    </div>
  );
}
