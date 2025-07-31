import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function ModuleManager() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchModules() {
      setLoading(true);
      const res = await axios.get('/api/admin/modules');
      setModules(res.data);
      setLoading(false);
    }
    fetchModules();
  }, []);

  if (loading) return <div>Loading modules...</div>;

  return (
    <div>
      <h2>Module Manager</h2>
      <p>Manage system modules and feature toggles here.</p>
      <ul>
        {modules.map(m => (
          <li key={m.id}>
            {m.name} - Enabled: {m.enabled ? 'Yes' : 'No'}
            {/* TODO: Add enable/disable toggle */}
          </li>
        ))}
      </ul>
    </div>
  );
}
