import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';

export default function AdminApprovals() {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'green' });

  const fetchPending = () => {
    setLoading(true);
    axios.get('/api/users')
      .then(res => {
        setPending(res.data.filter(u => u.status === 'Pending'));
        setError(null);
      })
      .catch(() => setError('Failed to load pending users.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPending();
  }, []);

  function handleApprove(id) {
    axios.patch(`/api/users/${id}/status`, { status: 'Active' })
      .then(() => {
        setSnackbar({ open: true, message: 'User approved.', color: 'green' });
        fetchPending();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to approve user.', color: 'red' }));
  }
  function handleReject(id) {
    axios.patch(`/api/users/${id}/status`, { status: 'Rejected' })
      .then(() => {
        setSnackbar({ open: true, message: 'User rejected.', color: 'green' });
        fetchPending();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to reject user.', color: 'red' }));
  }
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Approval Panel</h2>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-red-600 py-4">{error}</div>
      ) : pending.length === 0 ? (
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
      {snackbar.open && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white ${snackbar.color === 'green' ? 'bg-green-600' : 'bg-red-600'}`}>{snackbar.message}</div>
      )}
    </div>
  );
}
