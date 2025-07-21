import React, { useState } from 'react';
import { AiOutlineCloudUpload, AiOutlinePlus, AiOutlineCalendar, AiOutlineExclamationCircle, AiOutlineSearch, AiOutlineExport, AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const initialObservations = [
  { id: 1, date: '2025-07-19', type: 'Safety', note: 'Proper PPE used', severity: 'Low', category: 'PPE', dueDate: '2025-07-21', attachments: [] },
  { id: 2, date: '2025-07-18', type: 'Near Miss', note: 'Scaffold slip', severity: 'High', category: 'Fall Protection', dueDate: '2025-07-20', attachments: [] },
];

const ROLES = ['admin', 'inspector', 'supervisor', 'viewer'];
const currentRole = 'inspector'; // Stub: replace with actual role logic

export default function ObservationLog({ onAdd }) {
  const [observations, setObservations] = useState(initialObservations);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: '',
    note: '',
    severity: 'Low',
    category: '',
    dueDate: '',
    attachments: [],
    status: 'Draft',
  });
  const [filePreviews, setFilePreviews] = useState([]);
  const [autosave, setAutosave] = useState(false);
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [progress, setProgress] = useState(0);
  const [collapsed, setCollapsed] = useState({
    details: false,
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setAutosave(true); // Stub: trigger autosave
    // TODO: Implement actual autosave logic
  }

  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    setForm(f => ({ ...f, attachments: files }));
    setFilePreviews(files.map(file => URL.createObjectURL(file)));
    setAutosave(true); // Stub: trigger autosave
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newObs = { ...form, id: observations.length + 1 };
    setObservations([...observations, newObs]);
    if (onAdd) onAdd(newObs);
    setForm({ date: new Date().toISOString().split('T')[0], type: '', note: '', severity: 'Low', category: '', dueDate: '', attachments: [], status: 'Draft' });
    setFilePreviews([]);
    setShowForm(false);
    setAutosave(false);
  }

  function handleCollapse(section) {
    setCollapsed(c => ({ ...c, [section]: !c[section] }));
  }

  // Filter and search logic
  const filteredObservations = observations.filter(obs => {
    const matchesFilter = filter ? obs.severity === filter : true;
    const matchesSearch = search ? obs.note.toLowerCase().includes(search.toLowerCase()) || obs.category.toLowerCase().includes(search.toLowerCase()) : true;
    return matchesFilter && matchesSearch;
  });

  // Progress bar logic (stub)
  React.useEffect(() => {
    if (showForm) {
      let filled = 0;
      if (form.date) filled++;
      if (form.type) filled++;
      if (form.category) filled++;
      if (form.severity) filled++;
      if (form.dueDate) filled++;
      if (form.note) filled++;
      setProgress(Math.round((filled / 6) * 100));
    } else {
      setProgress(0);
    }
  }, [form, showForm]);

  // Export stub
  function handleExport(type) {
    const logElement = document.getElementById('observation-log-container');
    if (type === 'PDF') {
      html2canvas(logElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        const filename = `ObservationLog_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(filename);
      });
    } else if (type === 'Excel') {
      const data = filteredObservations.map(obs => ({
        Date: obs.date,
        Type: obs.type,
        Note: obs.note,
        Severity: obs.severity,
        Category: obs.category,
        DueDate: obs.dueDate,
        Status: obs.status
      }));
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Observations');
      const filename = `ObservationLog_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, filename);
    }
  }

  return (
    <div id="observation-log-container" className="space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-2">
        <h3 className="text-xl font-bold flex items-center gap-2"><AiOutlineExclamationCircle className="text-red-500" /> Safety Observations</h3>
        <div className="flex gap-2 items-center">
          <button className="bg-blue-100 text-blue-600 px-2 py-1 rounded flex items-center gap-1" onClick={() => handleExport('PDF')}><AiOutlineFilePdf /> PDF</button>
          <button className="bg-green-100 text-green-600 px-2 py-1 rounded flex items-center gap-1" onClick={() => handleExport('Excel')}><AiOutlineFileExcel /> Excel</button>
        </div>
      </div>
      {autosave && <div className="text-xs text-green-600">Autosaving...</div>}
      {showForm && (
        <form className="bg-white p-4 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" onSubmit={handleSubmit} aria-label="Observation Entry Form">
          <div className="md:col-span-2 mb-2">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="text-xs text-slate-500 mt-1">Progress: {progress}%</div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Date</label>
            <input type="date" name="date" className="w-full rounded px-3 py-2 border" value={form.date} onChange={handleInput} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Type</label>
            <select name="type" className="w-full rounded px-3 py-2 border" value={form.type} onChange={handleInput} required>
              <option value="">Select Type</option>
              <option value="Safety">Safety</option>
              <option value="Near Miss">Near Miss</option>
              <option value="Quality">Quality</option>
              <option value="Environmental">Environmental</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Category</label>
            <input type="text" name="category" className="w-full rounded px-3 py-2 border" value={form.category} onChange={handleInput} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Severity</label>
            <select name="severity" className="w-full rounded px-3 py-2 border" value={form.severity} onChange={handleInput} required>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Due Date</label>
            <input type="date" name="dueDate" className="w-full rounded px-3 py-2 border" value={form.dueDate} onChange={handleInput} />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Status</label>
            <select name="status" className="w-full rounded px-3 py-2 border" value={form.status} onChange={handleInput} required>
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Observation Note</label>
            <textarea name="note" className="w-full rounded px-3 py-2 border" value={form.note} onChange={handleInput} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Attachments</label>
            <input type="file" multiple className="hidden" id="file-upload" onChange={handleFileUpload} />
            <label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer text-blue-600">
              <AiOutlineCloudUpload size={24} /> Upload Files
            </label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {filePreviews.map((src, idx) => (
                <img key={idx} src={src} alt="Preview" className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
          </div>
          <div className="md:col-span-2 flex gap-4 justify-end mt-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition" disabled={currentRole === 'viewer'} title={currentRole === 'viewer' ? 'Viewers cannot submit' : 'Save'}>Save</button>
            <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
      <div className="flex flex-col md:flex-row justify-between items-center mb-2 gap-2">
        <div className="flex gap-2 items-center">
          <input type="text" placeholder="Search observations..." className="rounded px-2 py-1 border" value={search} onChange={e => setSearch(e.target.value)} />
          <select className="rounded px-2 py-1 border" value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">All Severities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>
      <ul className="divide-y divide-slate-200">
        {filteredObservations.map(obs => (
          <li key={obs.id} className="py-3 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-blue-50 rounded-xl transition cursor-pointer">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center w-full">
              <span className="font-semibold flex items-center gap-1"><AiOutlineCalendar /> {obs.date}</span>
              <span className={`text-xs px-2 py-1 rounded ${obs.severity === 'High' ? 'bg-red-100 text-red-600' : obs.severity === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>{obs.severity}</span>
              <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">{obs.category}</span>
              <span className="text-sm text-slate-500">{obs.type}: {obs.note}</span>
              <span className="text-xs text-slate-400">Due: {obs.dueDate || '-'}</span>
              <span className={`text-xs px-2 py-1 rounded ${obs.status === 'Draft' ? 'bg-yellow-100 text-yellow-600' : obs.status === 'Submitted' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>{obs.status || 'Draft'}</span>
            </div>
            <button className="text-blue-600 underline" onClick={() => handleCollapse('details')}>{collapsed.details ? 'Expand' : 'Collapse'} Details</button>
            {!collapsed.details && (
              <div className="mt-2 w-full bg-slate-50 rounded-xl p-4 shadow-inner">
                <div className="mb-2"><strong>Details:</strong> {obs.note}</div>
                <div className="mb-2"><strong>Category:</strong> {obs.category}</div>
                <div className="mb-2"><strong>Due Date:</strong> {obs.dueDate || '-'}</div>
                <div className="mb-2"><strong>Status:</strong> {obs.status || 'Draft'}</div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
