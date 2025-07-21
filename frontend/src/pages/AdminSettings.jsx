import React from 'react';
import { useState } from 'react';
export default function AdminSettings() {
  const [maintenance, setMaintenance] = useState(false);
  const [orgName, setOrgName] = useState('ConsIMS');
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">System Settings</h2>
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
      <button className="bg-blue-500 text-white px-4 py-1 rounded">Save Settings</button>
    </div>
  );
}
