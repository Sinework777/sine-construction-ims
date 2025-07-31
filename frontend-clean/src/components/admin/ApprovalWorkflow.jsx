import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ApprovalWorkflow() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      setLoading(true);
      const res = await axios.get('/api/admin/approvals');
      setRequests(res.data);
      setLoading(false);
    }
    fetchRequests();
  }, []);

  if (loading) return <div>Loading approval requests...</div>;

  return (
    <div>
      <h2>Approval Workflow</h2>
      <p>Manage approval requests and workflows here.</p>
      <ul>
        {requests.map(r => (
          <li key={r.id}>
            {r.type} - Status: {r.status}
            {/* TODO: Add approve/reject actions */}
          </li>
        ))}
      </ul>
    </div>
  );
}
