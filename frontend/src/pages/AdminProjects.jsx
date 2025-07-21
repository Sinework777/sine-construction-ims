import React from 'react';
import { useState } from 'react';
const initialProjects = [
  { id: 1, name: 'Alpha', users: ['Alice Admin', 'Bob PM'] },
  { id: 2, name: 'Beta', users: ['Charlie QA'] },
];
export default function AdminProjects() {
  const [projects, setProjects] = useState(initialProjects);
  const [newProject, setNewProject] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  function handleAddProject(e) {
    e.preventDefault();
    setProjects([...projects, { id: Date.now(), name: newProject, users: [] }]);
    setNewProject('');
  }
  function handleDelete(id) {
    setProjects(projects.filter(p => p.id !== id));
  }
  function handleEdit(id) {
    setEditId(id);
    const proj = projects.find(p => p.id === id);
    setEditName(proj.name);
  }
  function handleUpdateProject(e) {
    e.preventDefault();
    setProjects(projects.map(p => p.id === editId ? { ...p, name: editName } : p));
    setEditId(null);
    setEditName('');
  }
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Project Configuration</h2>
      <form className="mb-6 flex gap-2" onSubmit={handleAddProject}>
        <input className="border px-2 py-1" placeholder="Project Name" value={newProject} onChange={e => setNewProject(e.target.value)} required />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" type="submit">Add Project</button>
      </form>
      <table className="w-full border mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Project</th>
            <th className="p-2">Users</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(p => (
            <tr key={p.id}>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.users.join(', ')}</td>
              <td className="p-2">
                <button className="text-blue-600 mr-2" onClick={() => handleEdit(p.id)}>Edit</button>
                <button className="text-red-600" onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editId && (
        <form className="mb-6 flex gap-2" onSubmit={handleUpdateProject}>
          <input className="border px-2 py-1" placeholder="Project Name" value={editName} onChange={e => setEditName(e.target.value)} required />
          <button className="bg-green-500 text-white px-4 py-1 rounded" type="submit">Update Project</button>
        </form>
      )}
    </div>
  );
}
