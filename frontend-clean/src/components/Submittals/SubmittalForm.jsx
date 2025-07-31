import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import SubmittalLog from './SubmittalLog';
import SubmittalReview from './SubmittalReview';

const initialForm = {
  title: '',
  status: 'Pending',
  date: '',
  files: [],
};

export default function SubmittalForm({ onSave, onCancel }) {
  const [form, setForm] = useState(initialForm);
  const [filePreviews, setFilePreviews] = useState([]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    setForm(f => ({ ...f, files: files }));
    setFilePreviews(files.map(file => URL.createObjectURL(file)));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
    setForm(initialForm);
    setFilePreviews([]);
  }

  function handleExport(type) {
    const formElement = document.getElementById('submittal-form-container');
    if (type === 'PDF') {
      html2canvas(formElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        const filename = `Submittal_${form.dueDate || new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(filename);
      });
    } else if (type === 'Excel') {
      const data = [{ SpecReference: form.specReference, DueDate: form.dueDate, Status: form.status }];
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Submittal');
      const filename = `Submittal_${form.dueDate || new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, filename);
    }
  }

  return (
    <div>
      <div className="flex justify-end gap-4 mb-4">
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1"
          onClick={() => handleExport('PDF')}
        >
          <AiOutlineFilePdf /> Export PDF
        </button>
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1"
          onClick={() => handleExport('Excel')}
        >
          <AiOutlineFileExcel /> Export Excel
        </button>
      </div>
      <form
        id="submittal-form-container"
        className="space-y-6 bg-white p-8 rounded-xl shadow-xl"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl font-bold mb-2">New Submittal</h3>
        <div>
          <label className="block text-sm font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full rounded px-3 py-2 border"
            value={form.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Status</label>
          <select
            name="status"
            className="w-full rounded px-3 py-2 border"
            value={form.status}
            onChange={handleInputChange}
          >
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Date</label>
          <input
            type="date"
            name="date"
            className="w-full rounded px-3 py-2 border"
            value={form.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Files</label>
          <input
            type="file"
            multiple
            className="hidden"
            id="file-upload"
            onChange={handleFileUpload}
          />
          <label
            htmlFor="file-upload"
            className="flex items-center gap-2 cursor-pointer text-green-600"
          >
            <AiOutlineCloudUpload size={24} /> Upload Files
          </label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {filePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt="Preview"
                className="w-16 h-16 object-cover rounded shadow-md"
              />
            ))}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition"
          >
            Save
          </button>
          <button
            type="button"
            className="bg-slate-400 text-white px-4 py-2 rounded-xl shadow hover:bg-slate-500 transition"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
