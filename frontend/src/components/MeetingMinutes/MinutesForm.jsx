import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';

export default function MinutesForm({ onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('Draft');

  function handleExport(type) {
    const formElement = document.getElementById('minutes-form-container');
    if (type === 'PDF') {
      html2canvas(formElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        const filename = `MeetingMinutes_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(filename);
      });
    } else if (type === 'Excel') {
      const data = [{ Title: title, Status: status, Date: date }];
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Meeting Minutes');
      const filename = `MeetingMinutes_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, filename);
    }
  }

  return (
    <>
      <div className="flex gap-2 mt-4">
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('PDF')}><AiOutlineFilePdf /> Export PDF</button>
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('Excel')}><AiOutlineFileExcel /> Export Excel</button>
      </div>
      <form id="minutes-form-container" className="space-y-4 p-4 bg-white rounded-2xl shadow-md" onSubmit={e => { e.preventDefault(); onSave({ title, status, date }); }}>
        <h3 className="text-xl font-bold mb-2">Add Meeting Minutes</h3>
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input type="text" className="w-full rounded px-3 py-2 border" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Date</label>
          <input type="date" className="w-full rounded px-3 py-2 border" value={date} onChange={e => setDate(e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select className="w-full rounded px-3 py-2 border" value={status} onChange={e => setStatus(e.target.value)}>
            <option>Draft</option>
            <option>Finalized</option>
          </select>
        </div>
        <div className="flex gap-2 mt-4">
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Save</button>
          <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}
