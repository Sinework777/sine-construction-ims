import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RBACManager() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [rolesRes, permsRes, usersRes] = await Promise.all([
        axios.get('/api/admin/roles'),
        axios.get('/api/admin/permissions'),
        axios.get('/api/admin/users')
      ]);
      setRoles(rolesRes.data);
      setPermissions(permsRes.data);
      setUsers(usersRes.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading RBAC data...</div>;

  return (
    <div>
      <h2>RBAC Manager</h2>
      <h3>Users</h3>
      <ul>
        {users.map(u => (
          <li key={u.uid}>
            {u.displayName} ({u.email}) - Roles: {u.roles?.join(', ')}
            {/* TODO: Add assign/revoke role buttons */}
          </li>
        ))}
      </ul>
      <h3>Roles</h3>
      <ul>
        {roles.map(r => (
          <li key={r.id}>
            {r.name} - Permissions: {r.permissions?.join(', ')}
          </li>
        ))}
      </ul>
      <h3>Permissions</h3>
      <ul>
        {permissions.map(p => (
          <li key={p.id}>
            {p.name} ({p.module})
          </li>
        ))}
      </ul>
    </div>
  );
}
