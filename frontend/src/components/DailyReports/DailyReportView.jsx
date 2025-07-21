import React, { useState } from 'react';
import { AiOutlinePrinter, AiOutlineFilePdf } from 'react-icons/ai';

const ROLES = ['admin', 'supervisor', 'viewer'];
const currentRole = 'supervisor'; // Stub: replace with actual role logic

export default function DailyReportView({ report, onBack }) {
  const [collapsed, setCollapsed] = useState({
    info: false,
    activities: false,
    photos: false,
    signature: false,
  });

  if (!report) return null;

  function handlePrint() {
    window.print();
  }

  function handleCollapse(section) {
    setCollapsed(c => ({ ...c, [section]: !c[section] }));
  }

  function handlePrintView() {
    alert('Printing...');
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Daily Report Details</h2>
        {currentRole !== 'viewer' && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition"
            onClick={handlePrintView}
          >
            Print View
          </button>
        )}
      </div>
      <div className="space-y-6 p-6 bg-white rounded-2xl shadow-xl relative">
        {report.status === 'Draft' && (
          <div className="absolute top-4 right-4 text-yellow-500 text-lg font-bold opacity-60 pointer-events-none select-none">DRAFT</div>
        )}
        <div className="flex justify-between items-center">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={onBack}>Back</button>
          <div className="flex items-center gap-2">
            <button className="bg-green-600 text-white px-4 py-2 rounded-xl shadow hover:bg-green-700 transition" onClick={handlePrint}><AiOutlinePrinter size={20} /> Print</button>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-xl shadow hover:bg-yellow-600 transition"><AiOutlineFilePdf size={20} /> PDF</button>
          </div>
        </div>
        <div className="mt-4">
          <button className="text-blue-600 underline mb-2" onClick={() => handleCollapse('info')}>{collapsed.info ? 'Expand' : 'Collapse'} Info</button>
          {!collapsed.info && (
            <div>
              <p><strong>Project:</strong> {report.project}</p>
              <p><strong>Date:</strong> {report.date}</p>
              <p><strong>Status:</strong> {report.status}</p>
              <p><strong>Supervisor Comments:</strong> {report.supervisorComments}</p>
            </div>
          )}
        </div>
        <div className="mt-4">
          <button className="text-blue-600 underline mb-2" onClick={() => handleCollapse('activities')}>{collapsed.activities ? 'Expand' : 'Collapse'} Activities</button>
          {!collapsed.activities && (
            <div>
              <p><strong>Activities:</strong> {report.activities ? report.activities[0]?.description : ''}</p>
              <p><strong>Notes:</strong> {report.activities ? report.activities[0]?.notes : ''}</p>
              <p><strong>Team:</strong> {report.activities ? report.activities[0]?.team : ''}</p>
            </div>
          )}
        </div>
        <div className="mt-4">
          <button className="text-blue-600 underline mb-2" onClick={() => handleCollapse('photos')}>{collapsed.photos ? 'Expand' : 'Collapse'} Photos</button>
          {!collapsed.photos && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {report.photos && report.photos.map((photo, index) => (
                <img key={index} src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)} alt="Preview" className="w-full h-32 object-cover rounded-xl" />
              ))}
            </div>
          )}
        </div>
        <div className="mt-4">
          <button className="text-blue-600 underline mb-2" onClick={() => handleCollapse('signature')}>{collapsed.signature ? 'Expand' : 'Collapse'} Signature</button>
          {!collapsed.signature && (
            <div>
              {report.signature ? <img src={report.signature} alt="Signature" className="w-48 h-24 object-contain border rounded-xl" /> : <span>No signature</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
