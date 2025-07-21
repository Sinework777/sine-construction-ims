import React from 'react';
import { useState } from 'react';
const initialUsers = [
  { id: 1, name: 'Alice Admin', email: 'alice@consims.com', role: 'Admin' },
  { id: 2, name: 'Bob PM', email: 'bob@consims.com', role: 'Project Manager' },
  { id: 3, name: 'Charlie Engineer', email: 'charlie@consims.com', role: 'Site Engineer' },
  { id: 4, name: 'Diana QAQC', email: 'diana@consims.com', role: 'QA/QC' },
  { id: 5, name: 'Eve HSE', email: 'eve@consims.com', role: 'HSE' },
];
const rolesList = [
  'Admin', 'Project Manager', 'QA/QC Engineer', 'HSE Officer', 'Document Controller', 'Cost Engineer', 'Procurement Engineer', 'Scheduler / Planner', 'Site Supervisor', 'Design Engineer', 'Architect', 'Mechanical Engineer', 'Electrical Engineer', 'Client / Owner',
];
export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [editId, setEditId] = useState(null);
  const [editUser, setEditUser] = useState({ name: '', email: '', role: '' });

  function handleAddUser(e) {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: Date.now() }]);
    setNewUser({ name: '', email: '', role: '' });
  }
  function handleDelete(id) {
    setUsers(users.filter(u => u.id !== id));
  }
  function handleEdit(id) {
    setEditId(id);
    const user = users.find(u => u.id === id);
    setEditUser({ name: user.name, email: user.email, role: user.role });
  }
  function handleUpdateUser(e) {
    e.preventDefault();
    setUsers(users.map(u => u.id === editId ? { ...editUser, id: editId } : u));
    setEditId(null);
    setEditUser({ name: '', email: '', role: '' });
  }
  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">User Management</h2>
        <p className="text-slate-600">Manage all IMS users and their roles.</p>
      </div>
      <form className="mb-6 flex gap-2" onSubmit={handleAddUser}>
        <input className="border px-2 py-1" placeholder="Name" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} required />
        <input className="border px-2 py-1" placeholder="Email" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} required />
        <select className="border px-2 py-1" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })} required>
          <option value="">Select Role</option>
          {rolesList.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <button className="bg-blue-500 text-white px-4 py-1 rounded" type="submit">Add User</button>
      </form>
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
          {users.map(u => (
            <tr key={u.id}>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">
                <button className="text-blue-600 mr-2" onClick={() => handleEdit(u.id)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId && (
        <form className="mb-6 flex gap-2" onSubmit={handleUpdateUser}>
          <input className="border px-2 py-1" placeholder="Name" value={editUser.name} onChange={e => setEditUser({ ...editUser, name: e.target.value })} required />
          <input className="border px-2 py-1" placeholder="Email" value={editUser.email} onChange={e => setEditUser({ ...editUser, email: e.target.value })} required />
          <select className="border px-2 py-1" value={editUser.role} onChange={e => setEditUser({ ...editUser, role: e.target.value })} required>
            <option value="">Select Role</option>
            {rolesList.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button className="bg-green-500 text-white px-4 py-1 rounded" type="submit">Update User</button>
        </form>
      )}
    </div>
  );
}
