import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';

export default function MaterialLogView({ log, onBack }) {
  const [error, setError] = useState('');
  if (!log) return null;

  function handleExport(type) {
    try {
      const viewElement = document.getElementById('material-log-view-container');
      if (type === 'PDF') {
        html2canvas(viewElement).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
          const filename = `MaterialLogView_${log.date || new Date().toISOString().split('T')[0]}.pdf`;
          pdf.save(filename);
        });
      } else if (type === 'Excel') {
        const data = [{
          MaterialName: log.material,
          Quantity: log.qty,
          Unit: log.unit,
          DeliveryDate: log.date
        }];
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Material Log View');
        const filename = `MaterialLogView_${log.date || new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, filename);
      }
      setError('');
    } catch {
      setError('Failed to export material log.');
    }
  }

  return (
    <div className="p-4 bg-white rounded-2xl shadow-md mb-4">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <h3 className="text-xl font-bold mb-2">Material Log Details</h3>
      <div className="mb-2"><span className="font-semibold">Material:</span> {log.material}</div>
      <div className="mb-2"><span className="font-semibold">Quantity:</span> {log.qty} {log.unit}</div>
      <div className="mb-2"><span className="font-semibold">Status:</span> {log.status}</div>
      <div className="mb-2"><span className="font-semibold">Date:</span> {log.date}</div>
      <div className="flex gap-2 mb-4">
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('PDF')}><AiOutlineFilePdf /> Export PDF</button>
        <button type="button" className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('Excel')}><AiOutlineFileExcel /> Export Excel</button>
      </div>
      <div id="material-log-view-container" className="space-y-6 bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl shadow-lg">
        {/* Content to be exported as PDF/Excel */}
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onBack}>Back</button>
    </div>
  );
}
