import React, { useState, useEffect } from 'react';
import axios from '../axiosInstance';

export default function AdminCompanies() {
  const [companies, setCompanies] = useState([]);
  const [newCompany, setNewCompany] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', color: 'green' });

  const fetchCompanies = () => {
    setLoading(true);
    axios.get('/api/companies')
      .then(res => {
        setCompanies(res.data);
        setError(null);
      })
      .catch(() => setError('Failed to load companies.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  function handleAddCompany(e) {
    e.preventDefault();
    axios.post('/api/companies', { name: newCompany })
      .then(() => {
        setSnackbar({ open: true, message: 'Company added.', color: 'green' });
        setNewCompany('');
        fetchCompanies();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to add company.', color: 'red' }));
  }
  function handleDelete(id) {
    axios.delete(`/api/companies/${id}`)
      .then(() => {
        setSnackbar({ open: true, message: 'Company deleted.', color: 'green' });
        fetchCompanies();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to delete company.', color: 'red' }));
  }
  function handleEdit(id) {
    setEditId(id);
    const comp = companies.find(c => c.id === id);
    setEditName(comp.name);
  }
  function handleUpdateCompany(e) {
    e.preventDefault();
    axios.put(`/api/companies/${editId}`, { name: editName })
      .then(() => {
        setSnackbar({ open: true, message: 'Company updated.', color: 'green' });
        fetchCompanies();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to update company.', color: 'red' }));
    setEditId(null);
    setEditName('');
  }
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Companies Management</h2>
      <form className="mb-6 flex gap-2" onSubmit={handleAddCompany}>
        <input className="border px-2 py-1" placeholder="Company Name" value={newCompany} onChange={e => setNewCompany(e.target.value)} required />
        <button className="bg-blue-500 text-white px-4 py-1 rounded" type="submit">Add Company</button>
      </form>
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="text-red-600 py-4">{error}</div>
      ) : (
        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Company</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {companies.map(c => (
              <tr key={c.id}>
                <td className="p-2">{c.name}</td>
                <td className="p-2">
                  <button className="text-blue-600 mr-2" onClick={() => handleEdit(c.id)}>Edit</button>
                  <button className="text-red-600" onClick={() => handleDelete(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editId && (
        <form className="mb-6 flex gap-2" onSubmit={handleUpdateCompany}>
          <input className="border px-2 py-1" placeholder="Company Name" value={editName} onChange={e => setEditName(e.target.value)} required />
          <button className="bg-green-500 text-white px-4 py-1 rounded" type="submit">Update Company</button>
        </form>
      )}
      {snackbar.open && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded shadow-lg text-white ${snackbar.color === 'green' ? 'bg-green-600' : 'bg-red-600'}`}>{snackbar.message}</div>
      )}
    </div>
  );
}
