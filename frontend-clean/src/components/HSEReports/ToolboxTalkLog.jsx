import React, { useState } from 'react';
import { AiOutlineCloudUpload, AiOutlinePlus, AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

export default function ToolboxTalkLog() {
  const [talks, setTalks] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    topic: '',
    attendees: '',
    attachments: [],
  });
  const [filePreviews, setFilePreviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [autosave, setAutosave] = useState(false);

  function handleInput(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    setAutosave(true);
  }

  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    setForm(f => ({ ...f, attachments: files }));
    setFilePreviews(files.map(file => URL.createObjectURL(file)));
    setAutosave(true);
  }

  function handleExport(type) {
    const logElement = document.getElementById('toolbox-talk-log-container');
    if (type === 'PDF') {
      html2canvas(logElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        const filename = `ToolboxTalkLog_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(filename);
      });
    } else if (type === 'Excel') {
      const data = talks.map(talk => ({
        Date: talk.date,
        Topic: talk.topic,
        Attendees: talk.attendees
      }));
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Toolbox Talks');
      const filename = `ToolboxTalkLog_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, filename);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setTalks([...talks, { ...form, id: talks.length + 1 }]);
    setForm({ date: new Date().toISOString().split('T')[0], topic: '', attendees: '', attachments: [] });
    setFilePreviews([]);
    setShowForm(false);
    setAutosave(false);
  }

  function parseAttendees(attendees) {
    return attendees.split(',').map(a => a.trim()).filter(Boolean);
  }

  return (
    <div id="toolbox-talk-log-container" className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Toolbox Talk Log</h3>
        <div className="flex gap-2">
          <button className="bg-blue-100 text-blue-600 px-2 py-1 rounded flex items-center gap-1" onClick={() => handleExport('PDF')} title="Export to PDF"><AiOutlineFilePdf /> PDF</button>
          <button className="bg-green-100 text-green-600 px-2 py-1 rounded flex items-center gap-1" onClick={() => handleExport('Excel')} title="Export to Excel"><AiOutlineFileExcel /> Excel</button>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition flex items-center gap-2" onClick={() => setShowForm(true)}><AiOutlinePlus /> Log Toolbox Talk</button>
      </div>
      {autosave && <div className="text-xs text-green-600">Autosaving...</div>}
      {showForm && (
        <form className="bg-white p-4 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">Date</label>
            <input type="date" name="date" className="w-full rounded px-3 py-2 border" value={form.date} onChange={handleInput} required />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Topic</label>
            <input type="text" name="topic" className="w-full rounded px-3 py-2 border" value={form.topic} onChange={handleInput} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Attendees (comma separated)</label>
            <input type="text" name="attendees" className="w-full rounded px-3 py-2 border" value={form.attendees} onChange={handleInput} required />
            <div className="text-xs text-slate-500 mt-1">Parsed: {parseAttendees(form.attendees).join(', ')}</div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Attachments</label>
            <input type="file" multiple className="hidden" id="toolbox-upload" onChange={handleFileUpload} />
            <label htmlFor="toolbox-upload" className="flex items-center gap-2 cursor-pointer text-blue-600">
              <AiOutlineCloudUpload size={24} /> Upload Files
            </label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {filePreviews.map((src, idx) => (
                <img key={idx} src={src} alt="Preview" className="w-16 h-16 object-cover rounded" />
              ))}
            </div>
          </div>
          <div className="md:col-span-2 flex gap-4 justify-end mt-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Save</button>
            <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
      <ul className="divide-y divide-slate-200">
        {talks.map(talk => (
          <li key={talk.id} className="py-3 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-blue-50 rounded-xl transition">
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center w-full">
              <span className="font-semibold">{talk.date}</span>
              <span className="text-sm text-slate-500">{talk.topic}</span>
              <span className="text-xs text-slate-400">Attendees: {parseAttendees(talk.attendees).join(', ')}</span>
              {talk.attachments && talk.attachments.length > 0 && (
                <span className="text-xs text-blue-600">{talk.attachments.length} file(s)</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
