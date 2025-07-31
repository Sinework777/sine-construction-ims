import React from 'react';
const modules = [
  { name: 'User Management', status: 'Active', link: '/dashboard/admin/users' },
  { name: 'System Settings', status: 'Active', link: '/dashboard/admin/settings' },
  { name: 'Approval Panel', status: 'Active', link: '/dashboard/admin/approvals' },
  { name: 'Audit Log', status: 'Active', link: '/dashboard/admin/audit-log' },
  { name: 'Project Configuration', status: 'Active', link: '/dashboard/admin/projects' },
];
export default function AdminModules() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">All Modules</h2>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Module</th>
            <th className="p-2">Status</th>
            <th className="p-2">Link</th>
          </tr>
        </thead>
        <tbody>
          {modules.map(m => (
            <tr key={m.name}>
              <td className="p-2">{m.name}</td>
              <td className="p-2">{m.status}</td>
              <td className="p-2">
                <a className="text-blue-600 underline" href={m.link}>Go</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
