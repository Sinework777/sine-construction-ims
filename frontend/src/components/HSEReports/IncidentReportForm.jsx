import React, { useState } from 'react';
import { AiOutlineCloudUpload, AiOutlineFilePdf, AiOutlineFileExcel, AiOutlineCheckCircle } from 'react-icons/ai';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const PPE_OPTIONS = ['Hard Hat', 'Safety Glasses', 'Gloves', 'Vest', 'Boots', 'Hearing Protection'];
const ROLES = ['admin', 'inspector', 'supervisor', 'viewer'];
const currentRole = 'inspector'; // Stub: replace with actual role logic

export default function IncidentReportForm({ onSubmit }) {
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '',
    worker: '',
    rootCause: '',
    correctiveAction: '',
    ppe: [],
    severity: 'Low',
    narrative: '',
    attachments: [],
    status: 'Draft',
    approved: false,
  });
  const [filePreviews, setFilePreviews] = useState([]);
  const [autosave, setAutosave] = useState(false);

  function handleInput(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setAutosave(true);
  }

  function handlePPE(option) {
    setForm(f => ({ ...f, ppe: f.ppe.includes(option) ? f.ppe.filter(p => p !== option) : [...f.ppe, option] }));
    setAutosave(true);
  }

  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    setForm(f => ({ ...f, attachments: files }));
    setFilePreviews(files.map(file => URL.createObjectURL(file)));
    setAutosave(true);
  }

  function handleExport(type) {
    const formElement = document.getElementById('incident-form-container');
    if (type === 'PDF') {
      html2canvas(formElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        const filename = `IncidentReport_${form.date}.pdf`;
        pdf.save(filename);
      });
    } else if (type === 'Excel') {
      const data = [{ Date: form.date, Worker: form.worker, Severity: form.severity, Status: form.status }];
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Incident Report');
      const filename = `IncidentReport_${form.date}.xlsx`;
      XLSX.writeFile(workbook, filename);
    }
  }

  function handleAI() {
    setForm(f => ({ ...f, narrative: 'AI-generated incident narrative (stub)...' }));
  }

  function handleApproval() {
    setForm(f => ({ ...f, approved: !f.approved }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
    setForm({ date: new Date().toISOString().split('T')[0], time: '', worker: '', rootCause: '', correctiveAction: '', ppe: [], severity: 'Low', narrative: '', attachments: [], status: 'Draft', approved: false });
    setFilePreviews([]);
    setAutosave(false);
  }

  return (
    <>
      <div className="flex gap-2">
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('PDF')}><AiOutlineFilePdf /> Export PDF</button>
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('Excel')}><AiOutlineFileExcel /> Export Excel</button>
      </div>
      <form id="incident-form-container" className="space-y-6 p-6 bg-white rounded-2xl shadow-xl" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold">Incident Report (OSHA 300/301)</h2>
        </div>
        {autosave && <div className="text-xs text-green-600">Autosaving...</div>}
        <div>
          <label className="block text-sm font-semibold mb-1">Date</label>
          <input type="date" name="date" className="w-full rounded px-3 py-2 border" value={form.date} onChange={handleInput} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Time</label>
          <input type="time" name="time" className="w-full rounded px-3 py-2 border" value={form.time} onChange={handleInput} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Affected Worker</label>
          <input type="text" name="worker" className="w-full rounded px-3 py-2 border" value={form.worker} onChange={handleInput} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Root Cause</label>
          <textarea name="rootCause" className="w-full rounded px-3 py-2 border" value={form.rootCause} onChange={handleInput} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Corrective Action</label>
          <textarea name="correctiveAction" className="w-full rounded px-3 py-2 border" value={form.correctiveAction} onChange={handleInput} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">PPE Checklist</label>
          <div className="flex flex-wrap gap-2">
            {PPE_OPTIONS.map(option => (
              <label key={option} className="flex items-center gap-1">
                <input type="checkbox" checked={form.ppe.includes(option)} onChange={() => handlePPE(option)} />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Severity Index</label>
          <select name="severity" className="w-full rounded px-3 py-2 border" value={form.severity} onChange={handleInput} required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Incident Narrative</label>
          <textarea name="narrative" className="w-full rounded px-3 py-2 border" value={form.narrative} onChange={handleInput} placeholder="Describe the incident..." />
          <button type="button" className="mt-2 bg-blue-100 text-blue-600 px-2 py-1 rounded flex items-center gap-1" title="AI Autofill (stub)" onClick={handleAI}>AI Autofill</button>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Attachments</label>
          <input type="file" multiple className="hidden" id="incident-upload" onChange={handleFileUpload} />
          <label htmlFor="incident-upload" className="flex items-center gap-2 cursor-pointer text-blue-600">
            <AiOutlineCloudUpload size={24} /> Upload Files
          </label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {filePreviews.map((src, idx) => (
              <img key={idx} src={src} alt="Preview" className="w-16 h-16 object-cover rounded" />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select name="status" className="w-full rounded px-3 py-2 border" value={form.status} onChange={handleInput} required>
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div className="flex gap-4 mt-4 items-center">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Submit</button>
          <button type="button" className="bg-yellow-500 text-white px-4 py-2 rounded-xl shadow hover:bg-yellow-600 transition" onClick={() => setForm({ date: new Date().toISOString().split('T')[0], time: '', worker: '', rootCause: '', correctiveAction: '', ppe: [], severity: 'Low', narrative: '', attachments: [], status: 'Draft', approved: false })}>Reset</button>
          <button type="button" className={`px-4 py-2 rounded-xl shadow flex items-center gap-1 ${form.approved ? 'bg-blue-600 text-white' : 'bg-slate-300 text-slate-600'}`} onClick={handleApproval} disabled={currentRole === 'viewer'} title={form.approved ? 'Approved' : 'Approve'}><AiOutlineCheckCircle /> {form.approved ? 'Approved' : 'Approve'}</button>
        </div>
      </form>
    </>
  );
}
