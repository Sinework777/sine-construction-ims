import React, { useState } from 'react';
import { AiOutlineCloudUpload, AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { useAuth } from '../../context/useAuth';

export default function InspectionChecklist() {
  const { userRole } = useAuth();
  const [checklists, setChecklists] = useState([]);
  const [form, setForm] = useState({ title: '', file: null });
  const [filePreview, setFilePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const canEdit = ["QAQC", "System Admin", "Super Admin"].includes(userRole);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];
    setForm(f => ({ ...f, file }));
    setFilePreview(file ? URL.createObjectURL(file) : null);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!canEdit) {
      setError('You do not have permission to upload checklists.');
      return;
    }
    try {
      setChecklists([...checklists, { ...form, id: checklists.length + 1 }]);
      setForm({ title: '', file: null });
      setFilePreview(null);
      setShowForm(false);
      setError('');
    } catch {
      setError('Failed to upload checklist. Please try again.');
    }
  }

  function handleExport(type) {
    const checklistElement = document.getElementById('inspection-checklist-container');
    if (type === 'PDF') {
      html2canvas(checklistElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        const filename = `InspectionChecklist_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(filename);
      });
    } else if (type === 'Excel') {
      const data = checklists.map(c => ({ Title: c.title }));
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Inspection Checklists');
      const filename = `InspectionChecklist_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, filename);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Inspection Checklists</h3>
        <div className="flex gap-2">
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('PDF')}><AiOutlineFilePdf /> Export PDF</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('Excel')}><AiOutlineFileExcel /> Export Excel</button>
        </div>
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={() => canEdit ? setShowForm(true) : setError('You do not have permission to upload checklists.')}
          disabled={!canEdit}
        >
          Upload Checklist
        </button>
      </div>
      {error && <div className="mb-2 text-red-600 font-semibold">{error}</div>}
      {showForm && (
        <form className="bg-white p-4 rounded-xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold mb-1">Checklist Title</label>
            <input type="text" name="title" className="w-full rounded px-3 py-2 border" value={form.title} onChange={handleInputChange} required />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Checklist File</label>
            <input type="file" className="hidden" id="checklist-upload" onChange={handleFileUpload} />
            <label htmlFor="checklist-upload" className="flex items-center gap-2 cursor-pointer text-blue-600">
              <AiOutlineCloudUpload size={24} /> Upload File
            </label>
            {filePreview && (
              <div className="mt-2">
                <iframe src={filePreview} title="Checklist Preview" className="w-full h-32 rounded border" />
              </div>
            )}
          </div>
          <div className="md:col-span-2 flex gap-4 justify-end mt-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition">Save</button>
            <button type="button" className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </form>
      )}
      <div id="inspection-checklist-container" className="space-y-4">
        <ul className="divide-y divide-slate-200">
          {checklists.map(cl => (
            <li key={cl.id} className="py-3 flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-blue-50 rounded-xl transition">
              <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-center w-full">
                <span className="font-semibold">{cl.title}</span>
                {cl.file && (
                  <span className="text-xs text-blue-600">File uploaded</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
