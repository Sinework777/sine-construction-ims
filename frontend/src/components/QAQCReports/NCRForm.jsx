import React, { useState } from 'react';
import { AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

export default function NCRForm({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('Open');
  const [date, setDate] = useState('');
  const [autosave, setAutosave] = useState(false);
  const [progress, setProgress] = useState(0);

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'status') setStatus(value);
    if (name === 'date') setDate(value);
    setAutosave(true);
  }

  React.useEffect(() => {
    let filled = 0;
    if (title) filled++;
    if (status) filled++;
    if (date) filled++;
    setProgress(Math.round((filled / 3) * 100));
  }, [title, status, date]);

  function handleExport(type) {
    const formElement = document.getElementById('ncr-form-container');
    if (type === 'PDF') {
      html2canvas(formElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        const filename = `NCRForm_${date}.pdf`;
        pdf.save(filename);
      });
    } else if (type === 'Excel') {
      const data = [{ Title: title, Status: status, Date: date }];
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'NCR Form');
      const filename = `NCRForm_${date}.xlsx`;
      XLSX.writeFile(workbook, filename);
    }
  }

  return (
    <>
      <div className="flex gap-2 mt-4">
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('PDF')}><AiOutlineFilePdf /> Export PDF</button>
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('Excel')}><AiOutlineFileExcel /> Export Excel</button>
      </div>
      <form id="ncr-form-container" className="space-y-4 p-4 bg-white rounded-2xl shadow-md" onSubmit={e => { e.preventDefault(); onSave({ title, status, date }); }}>
        <h3 className="text-xl font-bold mb-2">Add/Edit NCR</h3>
        {autosave && <div className="text-xs text-green-600">Autosaving...</div>}
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input type="text" name="title" className="w-full rounded px-3 py-2 border" value={title} onChange={handleInputChange} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select name="status" className="w-full rounded px-3 py-2 border" value={status} onChange={handleInputChange}>
            <option>Open</option>
            <option>Closed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Date</label>
          <input type="date" name="date" className="w-full rounded px-3 py-2 border" value={date} onChange={handleInputChange} required />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Save</button>
          <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={onCancel}>Cancel</button>
          <button type="button" className="bg-blue-100 text-blue-600 px-2 py-1 rounded flex items-center gap-1" onClick={() => handleExport('PDF')}><AiOutlineFilePdf /> PDF</button>
          <button type="button" className="bg-green-100 text-green-600 px-2 py-1 rounded flex items-center gap-1" onClick={() => handleExport('Excel')}><AiOutlineFileExcel /> Excel</button>
        </div>
      </form>
    </>
  );
}
