import React, { useEffect, useState } from 'react';

export default function AdminUserManagement() {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    // Simulate fetching pending users from localStorage
    const users = [];
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('signupData_')) {
        const user = JSON.parse(localStorage.getItem(key));
        if (user.status === 'pending') users.push({ ...user, key });
      }
    });
    setPendingUsers(users);
  }, []);

  function handleApprove(key) {
    const user = JSON.parse(localStorage.getItem(key));
    user.status = 'approved';
    user.role = 'pm'; // Assign default role or prompt admin for role
    localStorage.setItem(key, JSON.stringify(user));
    setPendingUsers(pendingUsers.filter(u => u.key !== key));
    // Optionally notify user via email
  }

  function handleReject(key) {
    const user = JSON.parse(localStorage.getItem(key));
    user.status = 'rejected';
    localStorage.setItem(key, JSON.stringify(user));
    setPendingUsers(pendingUsers.filter(u => u.key !== key));
    // Optionally notify user via email
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Pending User Approvals</h2>
      {pendingUsers.length === 0 ? (
        <div className="text-slate-500">No pending users.</div>
      ) : (
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
