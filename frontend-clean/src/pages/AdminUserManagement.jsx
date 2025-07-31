import React, { useEffect, useState } from 'react';

// AdminUserManagement: fallback user approval UI using localStorage
export default function AdminUserManagement() {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate fetching pending users from localStorage with error handling
    try {
      const users = [];
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('signupData_')) {
          try {
            const user = JSON.parse(localStorage.getItem(key));
            if (user && user.status === 'pending') users.push({ ...user, key });
          } catch {
            // Skip invalid JSON
          }
        }
      });
      setPendingUsers(users);
      setError('');
    } catch {
      setError('Failed to load users from localStorage.');
    }
  }, []);

  function handleApprove(key) {
    try {
      const user = JSON.parse(localStorage.getItem(key));
      user.status = 'approved';
      user.role = 'pm'; // Assign default role or prompt admin for role
      localStorage.setItem(key, JSON.stringify(user));
      setPendingUsers(pendingUsers.filter(u => u.key !== key));
      setError('');
    } catch {
      setError('Failed to approve user.');
    }
    // Optionally notify user via email
  }

  function handleReject(key) {
    try {
      const user = JSON.parse(localStorage.getItem(key));
      user.status = 'rejected';
      localStorage.setItem(key, JSON.stringify(user));
      setPendingUsers(pendingUsers.filter(u => u.key !== key));
      setError('');
    } catch {
      setError('Failed to reject user.');
    }
    // Optionally notify user via email
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Pending User Approvals</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {pendingUsers.length === 0 && !error ? (
        <div className="text-slate-500">No pending users.</div>
      ) : null}
      {pendingUsers.length > 0 && (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-blue-50">
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Email</th>
              <th className="py-2 px-4 text-left">Requested Role</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingUsers.map(user => (
              <tr key={user.key} className="border-b">
                <td className="py-2 px-4">{user.fullName}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4">{user.role}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600" onClick={() => handleApprove(user.key)}>Approve</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleReject(user.key)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
