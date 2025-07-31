// ...existing code...
import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import SignaturePad from '../shared/SignaturePad';
import { AiOutlineCloudUpload, AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const initialForm = {
  project: '',
  date: new Date().toISOString().split('T')[0],
  weather: '',
  manpower: [{ trade: '', workers: '', hours: '', notes: '' }],
  equipment: [{ name: '', qty: '', hours: '', location: '' }],
  workPerformed: '',
  safetyObservations: '',
  visitors: [{ company: '', timeIn: '', timeOut: '' }],
  delays: '',
  attachments: [],
  signature: '',
};

export default function NewDailyReport() {
  const { userRole } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [error, setError] = useState('');

  function handleInputChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleImageUpload(e) {
    const files = Array.from(e.target.files);
    setForm(f => ({ ...f, attachments: files }));
    setImagePreviews(files.map(file => URL.createObjectURL(file)));
  }

  function handleExportPDF() {
    try {
      const reportElement = document.getElementById('report-container');
      html2canvas(reportElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        const filename = `DailyReport_${form.date}.pdf`;
        pdf.save(filename);
      });
      setError('');
    } catch {
      setError('Failed to export PDF.');
    }
  }

  function handleExportExcel() {
    try {
      const data = [
        { Project: form.project, Date: form.date, Weather: form.weather },
        ...form.manpower.map(mp => ({ Trade: mp.trade, Workers: mp.workers, Hours: mp.hours, Notes: mp.notes })),
        ...form.equipment.map(eq => ({ Name: eq.name, Quantity: eq.qty, Hours: eq.hours, Location: eq.location })),
      ];
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Daily Report');
      const filename = `DailyReport_${form.date}.xlsx`;
      XLSX.writeFile(workbook, filename);
      setError('');
    } catch {
      setError('Failed to export Excel.');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (userRole === 'viewer') {
      setError('You do not have permission to submit reports.');
      return;
    }
    try {
      alert('Daily report submitted!'); // Placeholder for submission logic
      setForm(initialForm);
      setImagePreviews([]);
      setError('');
    } catch {
      setError('Failed to submit report.');
    }
  }


  return (
    <div className="space-y-6 bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-extrabold text-blue-800">New Daily Report</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form className="space-y-6 bg-white p-8 rounded-xl shadow-xl" onSubmit={handleSubmit}>
        {/* ...existing form fields... */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-blue-700">Project</label>
          <select
            name="project"
            className="w-full rounded px-3 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-500"
            value={form.project}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Project</option>
            <option value="Project A">Project A</option>
            <option value="Project B">Project B</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-blue-700">Date</label>
          <input
            type="date"
            name="date"
            className="w-full rounded px-3 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-500"
            value={form.date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-blue-700">Weather</label>
          <input
            type="text"
            name="weather"
            className="w-full rounded px-3 py-2 border border-blue-300 focus:ring-2 focus:ring-blue-500"
            value={form.weather}
            onChange={handleInputChange}
            placeholder="Auto-fill weather data"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-blue-700">Attachments</label>
          <input
            type="file"
            multiple
            className="hidden"
            id="image-upload"
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload" className="flex items-center gap-2 cursor-pointer text-blue-600">
            <AiOutlineCloudUpload size={24} /> Upload Images
          </label>
          <div className="flex gap-2 mt-2 flex-wrap">
            {imagePreviews.map((src, idx) => (
              <img key={idx} src={src} alt="Preview" className="w-16 h-16 object-cover rounded shadow-md" />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-blue-700">Signature</label>
          <SignaturePad onChange={dataURL => setForm(f => ({ ...f, signature: dataURL }))} />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition shadow-md"
            onClick={handleExportPDF}
          >
            <AiOutlineFilePdf /> Export PDF
          </button>
          <button
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 transition shadow-md"
            onClick={handleExportExcel}
          >
            <AiOutlineFileExcel /> Export Excel
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
