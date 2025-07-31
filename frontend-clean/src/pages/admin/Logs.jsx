import React from 'react';
import UserManagementAuditLog from '../../components/admin/UserManagementAuditLog';

export default function Logs() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">User Management Audit Logs</h1>
      <UserManagementAuditLog />
    </div>
  );
}
