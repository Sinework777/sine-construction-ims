import React from 'react';
import MaterialLogView from './MaterialLogView';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import { AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';

export default function MaterialLogList({ onAdd, onView }) {
  const logs = [
    { id: 1, material: 'Cement', qty: 50, unit: 'bags', status: 'Received', date: '2025-07-14' },
    { id: 2, material: 'Sand', qty: 20, unit: 'tons', status: 'Pending', date: '2025-07-16' },
  ];

  function handleExport(type) {
    const tableElement = document.getElementById('material-log-list-table');
    if (type === 'PDF') {
      html2canvas(tableElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
        const filename = `MaterialLogList_${new Date().toISOString().split('T')[0]}.pdf`;
        pdf.save(filename);
      });
    } else if (type === 'Excel') {
      const data = logs.map(log => ({
        MaterialName: log.material,
        Quantity: log.qty,
        Unit: log.unit,
        DeliveryDate: log.date
      }));
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Material Logs');
      const filename = `MaterialLogList_${new Date().toISOString().split('T')[0]}.xlsx`;
      XLSX.writeFile(workbook, filename);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-bold">Material Logs</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onAdd}>+ Add Log</button>
      </div>
      <div className="flex gap-2 items-center mb-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('PDF')}><AiOutlineFilePdf /> Export PDF</button>
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('Excel')}><AiOutlineFileExcel /> Export Excel</button>
      </div>
      <table id="material-log-list-table" className="w-full bg-white rounded-xl shadow-xl">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Material</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Quantity</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Unit</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Status</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Date</th>
            <th className="p-3 text-left text-sm font-semibold text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {logs.map(log => (
            <tr key={log.id} className="hover:bg-blue-50 transition">
              <td className="p-3 text-sm text-slate-700 font-medium">{log.material}</td>
              <td className="p-3 text-sm text-slate-700">{log.qty}</td>
              <td className="p-3 text-sm text-slate-700">{log.unit}</td>
              <td className="p-3 text-sm">
                <span className={`text-xs px-2 py-1 rounded ${log.status === 'Received' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-700'}`}>{log.status}</span>
              </td>
              <td className="p-3 text-sm text-slate-700">{log.date}</td>
              <td className="p-3 text-sm text-slate-700">
                <button className="text-blue-600 underline" onClick={() => onView(log)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
