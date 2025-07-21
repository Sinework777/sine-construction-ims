import React, { useState, useEffect } from 'react';
import NCRModule from '../../modules/qaqc/NCRModule.jsx';
import ChecklistManager from '../../components/shared/QAQC/ChecklistManager';
import InspectionLog from '../../components/shared/QAQC/InspectionLog';
import ApprovalsTracker from '../../components/shared/QAQC/ApprovalsTracker';
import QASummaryDashboard from '../../components/shared/QAQC/QASummaryDashboard';
import SummaryReports from '../../components/shared/QAQC/SummaryReports';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function QAQCPage() {
  const [activeTab, setActiveTab] = useState('ncrs');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time data updates
      const newNotification = {
        id: Date.now(),
        message: `New NCR logged at ${new Date().toLocaleTimeString()}`,
      };
      setNotifications((prev) => [...prev, newNotification]);
      toast.info(newNotification.message);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">QA/QC Module</h1>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('ncrs')}>NCRs</button>
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('checklists')}>Checklists</button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('inspections')}>Inspections</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => setActiveTab('approvals')}>Approvals</button>
          <button className="bg-purple-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('summary')}>Summary</button>
          <button className="bg-teal-600 text-white px-4 py-2 rounded" onClick={() => setActiveTab('reports')}>Reports</button>
        </div>
      </div>

      {activeTab === 'ncrs' && <NCRModule userRole={sessionStorage.getItem('role') || 'admin'} />}
      {activeTab === 'checklists' && <ChecklistManager />}
      {activeTab === 'inspections' && <InspectionLog />}
      {activeTab === 'approvals' && <ApprovalsTracker />}
      {activeTab === 'summary' && <QASummaryDashboard />}
      {activeTab === 'reports' && <SummaryReports />}

      <div className="mt-6">
        <h2 className="text-xl font-bold">Notifications</h2>
        <ul className="list-disc pl-6">
          {notifications.map((note) => (
            <li key={note.id}>{note.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
