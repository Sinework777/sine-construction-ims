import React from 'react';
import { useState } from 'react';
const initialPending = [
  { id: 1, name: 'Charlie QA', email: 'charlie@consims.com', role: 'QA/QC Engineer' },
];
export default function AdminApprovals() {
  const [pending, setPending] = useState(initialPending);
  function handleApprove(id) {
    setPending(pending.filter(u => u.id !== id));
  }
  function handleReject(id) {
    setPending(pending.filter(u => u.id !== id));
  }
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Approval Panel</h2>
      {pending.length === 0 ? (
        <p>No pending users.</p>
      ) : (
        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pending.map(u => (
              <tr key={u.id}>
                <td className="p-2">{u.name}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2">{u.role}</td>
                <td className="p-2">
                  <button className="text-green-600 mr-2" onClick={() => handleApprove(u.id)}>Approve</button>
                  <button className="text-red-600" onClick={() => handleReject(u.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
