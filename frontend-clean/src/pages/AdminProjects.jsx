import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'green' });

  const fetchProjects = () => {
    setLoading(true);
    axios.get('/api/projects')
      .then(res => {
        setProjects(res.data);
        setError(null);
      })
      .catch(() => setError('Failed to load projects.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  function handleAddProject(e) {
    e.preventDefault();
    axios.post('/api/projects', { name: newProject, companyId: 1 })
      .then(() => {
        setSnackbar({ open: true, message: 'Project added.', color: 'green' });
        setNewProject('');
        fetchProjects();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to add project.', color: 'red' }));
  }
  function handleDelete(id) {
    axios.delete(`/api/projects/${id}`)
      .then(() => {
        setSnackbar({ open: true, message: 'Project deleted.', color: 'green' });
        fetchProjects();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to delete project.', color: 'red' }));
  }
  function handleEdit(id) {
    setEditId(id);
    const proj = projects.find(p => p.id === id);
    setEditName(proj.name);
  }
  function handleUpdateProject(e) {
    e.preventDefault();
    axios.put(`/api/projects/${editId}`, { name: editName, companyId: 1 })
      .then(() => {
        setSnackbar({ open: true, message: 'Project updated.', color: 'green' });
        fetchProjects();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to update project.', color: 'red' }));
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
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-red-600 py-4">{error}</div>
      ) : (
        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Project</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td className="p-2">{p.name}</td>
                <td className="p-2">
                  <button className="text-blue-600 mr-2" onClick={() => handleEdit(p.id)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editId && (
        <form className="mb-6 flex gap-2" onSubmit={handleUpdateProject}>
          <input className="border px-2 py-1" placeholder="Project Name" value={editName} onChange={e => setEditName(e.target.value)} required />
          <button className="bg-green-500 text-white px-4 py-1 rounded" type="submit">Update Project</button>
        </form>
      )}
      {snackbar.open && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white ${snackbar.color === 'green' ? 'bg-green-600' : 'bg-red-600'}`}>{snackbar.message}</div>
      )}
    </div>
  );
}
