import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';

export default function DocumentForm({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Drawing');
  const [status, setStatus] = useState('Current');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  function handleExport(type) {
    try {
      const formElement = document.getElementById('document-form-container');
      if (type === 'PDF') {
        html2canvas(formElement).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
          const filename = `Document_${new Date().toISOString().split('T')[0]}.pdf`;
          pdf.save(filename);
        });
      } else if (type === 'Excel') {
        const data = [{ Title: title, Type: type, Status: status, Date: date }];
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Document');
        const filename = `Document_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, filename);
      }
      setError('');
    } catch {
      setError('Failed to export document.');
    }
  }

  return (
    <>
      <div className="flex gap-2 mt-4">
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('PDF')}><AiOutlineFilePdf /> Export PDF</button>
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('Excel')}><AiOutlineFileExcel /> Export Excel</button>
      </div>
      <form id="document-form-container" className="space-y-4 p-4 bg-white rounded-2xl shadow-md" onSubmit={e => { e.preventDefault(); try { onSave({ title, type, status, date }); setError(''); } catch { setError('Failed to save document.'); } }}>
        <h3 className="text-xl font-bold mb-2">Add Document</h3>
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input type="text" className="w-full rounded px-3 py-2 border" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Type</label>
          <select className="w-full rounded px-3 py-2 border" value={type} onChange={e => setType(e.target.value)}>
            <option>Drawing</option>
            <option>Specification</option>
            <option>Report</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select className="w-full rounded px-3 py-2 border" value={status} onChange={e => setStatus(e.target.value)}>
            <option>Current</option>
            <option>Obsolete</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Date</label>
          <input type="date" className="w-full rounded px-3 py-2 border" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Save</button>
          <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={onCancel}>Cancel</button>
        </div>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </form>
    </>
  );
}
