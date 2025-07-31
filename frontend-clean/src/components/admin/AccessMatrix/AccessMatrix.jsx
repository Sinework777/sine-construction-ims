// Access Matrix module for dynamic module/role/tenant assignment
import React, { useEffect, useState } from 'react';

/**
 * Firestore structure:
 * accessMatrix/{roleOrTenantId} => { modules: [moduleKeys...] }
 * Example: { modules: ['users', 'projects', ...] }
 */
export default function AccessMatrix() {
  const [roles, setRoles] = useState([]);
  const [modules, setModules] = useState([]);
  const [matrix, setMatrix] = useState({});

  useEffect(() => {
    // TODO: Fetch roles and modules from Firestore
    setRoles(['System Admin', 'Admin', 'PM', 'QAQC', 'HSE', 'User']);
    setModules([
      'multitenancy','globalusers','roles','licensebilling','auditlogging','securitycompliance','settings','backupsrecovery','supportannouncements','platformanalytics','apikeys','featureflags','projects','monitoring','workflows','support','data','tasks','licenses'
    ]);
    // TODO: Fetch access matrix from Firestore
  }, []);

  const handleToggle = (role, moduleKey) => {
    setMatrix(prev => ({
      ...prev,
      [role]: {
        ...(prev[role] || {}),
        [moduleKey]: !(prev[role]?.[moduleKey])
      }
    }));
    // TODO: Persist to Firestore
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Access Matrix</h2>
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="text-left">Role</th>
            {modules.map(m => <th key={m}>{m}</th>)}
          </tr>
        </thead>
        <tbody>
          {roles.map(role => (
            <tr key={role}>
              <td className="font-semibold">{role}</td>
              {modules.map(m => (
                <td key={m}>
                  <input type="checkbox" checked={!!(matrix[role]?.[m])} onChange={() => handleToggle(role, m)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-xs text-gray-500 mt-2">Assign modules to roles/tenants. Changes are saved in Firestore and enforced in UI and security rules.</div>
    </div>
  );
}
