import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';

export default function AdminSettings() {
  const [maintenance, setMaintenance] = useState(false);
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'green' });

  useEffect(() => {
    setLoading(true);
    axios.get('/api/settings')
      .then(res => {
        setMaintenance(res.data.maintenance);
        setOrgName(res.data.orgName);
        setError(null);
      })
      .catch(() => setError('Failed to load settings.'))
      .finally(() => setLoading(false));
  }, []);

  function handleSave() {
    axios.put('/api/settings', { maintenance, orgName })
      .then(() => setSnackbar({ open: true, message: 'Settings saved.', color: 'green' }))
      .catch(() => setSnackbar({ open: true, message: 'Failed to save settings.', color: 'red' }));
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">System Settings</h2>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-red-600 py-4">{error}</div>
      ) : (
        <>
          <div className="mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={maintenance} onChange={e => setMaintenance(e.target.checked)} />
              Maintenance Mode
            </label>
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Organization Name</label>
            <input className="border px-2 py-1" value={orgName} onChange={e => setOrgName(e.target.value)} />
          </div>
          <button className="bg-blue-500 text-white px-4 py-1 rounded" onClick={handleSave}>Save Settings</button>
        </>
      )}
      {snackbar.open && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white ${snackbar.color === 'green' ? 'bg-green-600' : 'bg-red-600'}`}>{snackbar.message}</div>
      )}
    </div>
  );
}
