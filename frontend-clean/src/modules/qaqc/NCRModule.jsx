// Centralized NCR Module for QA/QC
import React, { useState, useEffect } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { Download, Eye, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import mockNCRs from './mockNCRs.json';
import { useNavigate } from 'react-router-dom';

const roleOptions = {
  admin: ['QAQC Engineer', 'PM', 'Inspector', 'HSE'],
  pm: ['QAQC Engineer', 'Inspector'],
  qaqcEngineer: ['PM', 'Inspector'],
  inspector: ['QAQC Engineer'],
  hse: ['QAQC Engineer', 'PM'],
};

const statusColors = {
  Draft: 'bg-gray-300 text-gray-800',
  Open: 'bg-blue-200 text-blue-800',
  'In Review': 'bg-yellow-200 text-yellow-800',
  Approved: 'bg-green-200 text-green-800',
  Closed: 'bg-red-200 text-red-800',
};

export default function NCRModule() {
  const [tab, setTab] = useState('table');
  const [ncrs, setNCRs] = useState([]);
  const [filter, setFilter] = useState({ status: '', category: '', date: '', assigned: '' });
  const [form, setForm] = useState({
    ncrNo: '',
    category: '',
    description: '',
    rootCause: '',
    correctiveAction: '',
    assignedTo: '',
    dateRaised: '',
    priority: 'Medium',
    files: [],
    status: 'Draft',
  });
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  // Get the signed-in user's role from localStorage
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser') || '{}');
  const userRole = sessionUser.role || 'admin';

  useEffect(() => {
    // Load mock data
    setNCRs(mockNCRs);
  }, []);

  function handleFilterChange(e) {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  }

  function filteredNCRs() {
    return ncrs.filter(ncr => {
      return (
        (!filter.status || ncr.status === filter.status) &&
        (!filter.category || ncr.category === filter.category) &&
        (!filter.date || ncr.dateRaised === filter.date) &&
        (!filter.assigned || ncr.assignedTo === filter.assigned)
      );
    });
  }

  function handleFormChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileUpload(e) {
    setForm({ ...form, files: [...form.files, ...Array.from(e.target.files)] });
  }

  function handleAddNCR(e) {
    e.preventDefault();
    const newNCR = {
      ...form,
      ncrNo: 'NCR-' + uuidv4().slice(0, 8),
      dateRaised: form.dateRaised || new Date().toISOString().slice(0, 10),
      status: 'Open',
    };
    setNCRs([newNCR, ...ncrs]);
    setNotifications([...notifications, { type: 'new', message: `New NCR ${newNCR.ncrNo} created.` }]);
    toast.success('NCR created successfully!');
    setForm({
      ncrNo: '', category: '', description: '', rootCause: '', correctiveAction: '', assignedTo: '', dateRaised: '', priority: 'Medium', files: [], status: 'Draft',
    });
  }

  function handleExportPDF() {
    const doc = new jsPDF();
    doc.text('NCR Table', 14, 16);
    doc.autoTable({
      head: [['NCR No', 'Description', 'Category', 'Date Raised', 'Status', 'Assigned To']],
      body: filteredNCRs().map(ncr => [ncr.ncrNo, ncr.description, ncr.category, ncr.dateRaised, ncr.status, ncr.assignedTo]),
    });
    doc.save(`NCRs_${new Date().toISOString().slice(0, 10)}.pdf`);
  }

  function handleExportExcel() {
    const ws = XLSX.utils.json_to_sheet(filteredNCRs());
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'NCRs');
    XLSX.writeFile(wb, `NCRs_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  // ...existing code for chart data, approval workflow, notifications, etc...

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-6 mb-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-700 transition"
        onClick={() => navigate(`/dashboard/${userRole}`)}
      >
        ← Back to Dashboard
      </button>
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-2">
          <button className={`px-4 py-2 rounded ${tab === 'table' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`} onClick={() => setTab('table')}>📋 Table</button>
          <button className={`px-4 py-2 rounded ${tab === 'add' ? 'bg-green-600 text-white' : 'bg-slate-200'}`} onClick={() => setTab('add')}>➕ Add NCR</button>
          <button className={`px-4 py-2 rounded ${tab === 'summary' ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`} onClick={() => setTab('summary')}>📊 Summary</button>
          <button className={`px-4 py-2 rounded ${tab === 'filters' ? 'bg-yellow-500 text-white' : 'bg-slate-200'}`} onClick={() => setTab('filters')}>🔍 Filters</button>
          <button className={`px-4 py-2 rounded ${tab === 'export' ? 'bg-teal-600 text-white' : 'bg-slate-200'}`} onClick={() => { handleExportPDF(); handleExportExcel(); setTab('export'); }}>📤 Export</button>
          <button className={`px-4 py-2 rounded ${tab === 'notifications' ? 'bg-pink-600 text-white' : 'bg-slate-200'}`} onClick={() => setTab('notifications')}>📣 Notifications</button>
          <button className={`px-4 py-2 rounded ${tab === 'approval' ? 'bg-purple-600 text-white' : 'bg-slate-200'}`} onClick={() => setTab('approval')}>✅ Approval</button>
        </div>
      </div>
      {/* Tab Content */}
      {tab === 'table' && (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-800">
                <tr>
                  <th>NCR No</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Date Raised</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredNCRs().map(ncr => (
                  <tr key={ncr.ncrNo} className="border-b">
                    <td>{ncr.ncrNo}</td>
                    <td>{ncr.description}</td>
                    <td>{ncr.category}</td>
                    <td>{ncr.dateRaised}</td>
                    <td><span className={`px-2 py-1 rounded ${statusColors[ncr.status]}`}>{ncr.status}</span></td>
                    <td>{ncr.assignedTo}</td>
                    <td className="flex gap-2">
                      <button><Eye size={16} /></button>
                      <button><Edit size={16} /></button>
                      <button><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {tab === 'add' && (
        <form className="space-y-4" onSubmit={handleAddNCR}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>NCR Category</label>
              <select name="category" value={form.category} onChange={handleFormChange} className="w-full rounded-xl border px-3 py-2">
                <option value="">Select</option>
                <option>Workmanship</option>
                <option>Material</option>
                <option>Safety</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label>Assigned To</label>
              <select name="assignedTo" value={form.assignedTo} onChange={handleFormChange} className="w-full rounded-xl border px-3 py-2">
                <option value="">Select</option>
                {roleOptions[userRole].map(role => <option key={role}>{role}</option>)}
              </select>
            </div>
            <div>
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleFormChange} className="w-full rounded-xl border px-3 py-2" rows={2} />
            </div>
            <div>
              <label>Root Cause</label>
              <input type="text" name="rootCause" value={form.rootCause} onChange={handleFormChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label>Corrective Action</label>
              <input type="text" name="correctiveAction" value={form.correctiveAction} onChange={handleFormChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label>Date Raised</label>
              <input type="date" name="dateRaised" value={form.dateRaised} onChange={handleFormChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label>Priority</label>
              <select name="priority" value={form.priority} onChange={handleFormChange} className="w-full rounded-xl border px-3 py-2">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label>File/Image Upload</label>
              <input type="file" multiple onChange={handleFileUpload} className="w-full" />
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <button type="submit" className="bg-green-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-green-700 transition">➕ Submit</button>
            <button type="button" className="bg-gray-600 text-white font-bold px-6 py-2 rounded-xl shadow hover:bg-gray-700 transition" onClick={() => setForm({ ncrNo: '', category: '', description: '', rootCause: '', correctiveAction: '', assignedTo: '', dateRaised: '', priority: 'Medium', files: [], status: 'Draft' })}>Save as Draft</button>
          </div>
        </form>
      )}
      {tab === 'filters' && (
        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Status</label>
              <select name="status" value={filter.status} onChange={handleFilterChange} className="w-full rounded-xl border px-3 py-2">
                <option value="">All</option>
                <option>Draft</option>
                <option>Open</option>
                <option>In Review</option>
                <option>Approved</option>
                <option>Closed</option>
              </select>
            </div>
            <div>
              <label>Category</label>
              <select name="category" value={filter.category} onChange={handleFilterChange} className="w-full rounded-xl border px-3 py-2">
                <option value="">All</option>
                <option>Workmanship</option>
                <option>Material</option>
                <option>Safety</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label>Date</label>
              <input type="date" name="date" value={filter.date} onChange={handleFilterChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
            <div>
              <label>Assigned To</label>
              <input type="text" name="assigned" value={filter.assigned} onChange={handleFilterChange} className="w-full rounded-xl border px-3 py-2" />
            </div>
          </div>
        </div>
      )}
      {/* ...other tabs: summary, notifications, approval ... */}
    </div>
  );
}
