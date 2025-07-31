import React, { useState } from 'react';
import { useAuth } from '../../context/useAuth';
import { AiOutlineSearch, AiOutlineExport, AiOutlineFilePdf, AiOutlineFileExcel } from 'react-icons/ai';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const mockReports = [
  { id: 1, project: 'Project A', date: '2025-07-19', status: 'Submitted' },
  { id: 2, project: 'Project B', date: '2025-07-18', status: 'Draft' },
];



export default function DailyReportList({ onView }) {
  const { userRole } = useAuth();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [error, setError] = useState('');

  const filteredReports = mockReports.filter(report =>
    (search ? report.project.toLowerCase().includes(search.toLowerCase()) : true) &&
    (filterStatus ? report.status === filterStatus : true) &&
    (filterProject ? report.project === filterProject : true) &&
    (filterDate ? report.date === filterDate : true)
  );

  function handleExport(type) {
    try {
      const tableElement = document.getElementById('report-list-table');
      if (type === 'PDF') {
        html2canvas(tableElement).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
          const filename = `DailyReportList_${new Date().toISOString().split('T')[0]}.pdf`;
          pdf.save(filename);
        });
      } else if (type === 'Excel') {
        const data = filteredReports.map(report => ({
          Project: report.project,
          Date: report.date,
          Status: report.status
        }));
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Daily Reports');
        const filename = `DailyReportList_${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, filename);
      }
      setError('');
    } catch {
      setError('Failed to export reports.');
    }
  }

  function handlePrintView() {
    try {
      alert('Printing...');
      setError('');
    } catch {
      setError('Failed to print.');
    }
  }

  return (
    <div className="space-y-6">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Reports</h2>
        {userRole !== 'viewer' && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
            onClick={handlePrintView}
          >
            Print View
          </button>
        )}
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center gap-2">
        <div className="flex gap-2 items-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('PDF')}><AiOutlineFilePdf /> Export PDF</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2 flex items-center gap-1" onClick={() => handleExport('Excel')}><AiOutlineFileExcel /> Export Excel</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <input type="text" placeholder="Search" className="rounded px-3 py-2 border" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="rounded px-3 py-2 border" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Approved">Approved</option>
        </select>
        <input type="text" placeholder="Project" className="rounded px-3 py-2 border" value={filterProject} onChange={e => setFilterProject(e.target.value)} />
        <input type="date" className="rounded px-3 py-2 border" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
      </div>
      <table id="report-list-table" className="w-full border-collapse border border-slate-200">
        <thead>
          <tr className="bg-slate-100">
            <th className="border border-slate-300 px-4 py-2">Project</th>
            <th className="border border-slate-300 px-4 py-2">Date</th>
            <th className="border border-slate-300 px-4 py-2">Status</th>
            <th className="border border-slate-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map(report => (
            <tr key={report.id} className="hover:bg-blue-50">
              <td className="border border-slate-300 px-4 py-2">{report.project}</td>
              <td className="border border-slate-300 px-4 py-2">{report.date}</td>
              <td className="border border-slate-300 px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs ${report.status === 'Draft' ? 'bg-yellow-100 text-yellow-600' : report.status === 'Submitted' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>{report.status}</span>
              </td>
              <td className="border border-slate-300 px-4 py-2">
                <button className="text-blue-600 underline" onClick={() => onView(report)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
