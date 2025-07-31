import React, { useState } from 'react';
import { FaSearch, FaPlus, FaUser, FaUsers, FaChartBar, FaCheck, FaTimes } from 'react-icons/fa';
import modulesList from '../config/modulesList'; // Assume this exports an array of all 25+ modules
import rolesConfig from '../components/roles'; // Assume this exports all roles

// Simulated analytics data
const moduleAnalytics = modulesList.reduce((acc, m) => {
  acc[m.key] = { usage: Math.floor(Math.random() * 1000), lastUsed: new Date(Date.now() - Math.random() * 1e10).toLocaleDateString() };
  return acc;
}, {});

export default function ModuleMarketplace() {
  const [search, setSearch] = useState('');
  const [assignRole, setAssignRole] = useState('');
  const [assigned, setAssigned] = useState({}); // { moduleKey: [roles] }

  const filteredModules = modulesList.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

  function handleAssign(moduleKey, role) {
    setAssigned(prev => ({ ...prev, [moduleKey]: [...(prev[moduleKey] || []), role] }));
  }
  function handleUnassign(moduleKey, role) {
    setAssigned(prev => ({ ...prev, [moduleKey]: (prev[moduleKey] || []).filter(r => r !== role) }));
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Module Marketplace</h2>
      <div className="flex gap-4 mb-6">
        <div className="flex items-center border rounded px-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            className="outline-none py-2"
            placeholder="Search modules..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Module</th>
            <th className="p-2">Analytics</th>
            <th className="p-2">Assigned Roles</th>
            <th className="p-2">Assign/Unassign</th>
          </tr>
        </thead>
        <tbody>
          {filteredModules.map(m => (
            <tr key={m.key} className="border-b">
              <td className="p-2 font-semibold flex items-center gap-2">
                {m.icon} {m.name}
              </td>
              <td className="p-2 text-sm">
                <div>Usage: <span className="font-mono">{moduleAnalytics[m.key].usage}</span></div>
                <div>Last Used: <span className="font-mono">{moduleAnalytics[m.key].lastUsed}</span></div>
              </td>
              <td className="p-2">
                {(assigned[m.key] || []).map(role => (
                  <span key={role} className="inline-flex items-center bg-blue-100 text-blue-700 rounded px-2 py-1 mr-1 mb-1 text-xs">
                    <FaUser className="mr-1" />{role}
                    <button className="ml-1 text-red-500" onClick={() => handleUnassign(m.key, role)}><FaTimes /></button>
                  </span>
                ))}
              </td>
              <td className="p-2">
                <select className="border rounded px-2 py-1 mr-2" value={assignRole} onChange={e => setAssignRole(e.target.value)}>
                  <option value="">Select Role</option>
                  {Object.keys(rolesConfig).map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <button className="bg-green-600 text-white px-2 py-1 rounded" onClick={() => { if(assignRole) handleAssign(m.key, assignRole); }}><FaCheck /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-2">Add Custom Module</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2"><FaPlus /> Add Module</button>
      </div>
    </div>
  );
}
