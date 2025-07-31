import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminUserManagement from './AdminUserManagement.jsx';
import { FaUsers, FaCog, FaClipboardList, FaCheckCircle, FaHistory, FaProjectDiagram, FaCogs } from 'react-icons/fa';

const DashboardAdmin = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    axiosInstance.get('/reports')
      .then(res => {
        setReports(res.data.reports);
        setError('');
      })
      .catch(() => {
        setReports([]);
        setError('Failed to load reports.');
      });
  }, []);
  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, Admin</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <button
          className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center hover:bg-blue-200 transition cursor-pointer"
          onClick={() => navigate('/dashboard/admin/users')}
        >
          <FaUsers className="text-blue-600 text-3xl mb-2" />
          <div className="font-bold text-lg">User Management</div>
          <div className="text-sm text-gray-600">Manage users and permissions.</div>
        </button>
        {reports.map(r => (
          <div key={r.id} className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
            <div className="font-bold text-lg">{r.title}</div>
            <div className="text-sm text-gray-600">Status: {r.status}</div>
          </div>
        ))}
        <button
          className="bg-indigo-100 rounded-xl p-6 shadow flex flex-col items-center hover:bg-indigo-200 transition cursor-pointer"
          onClick={() => navigate('/dashboard/admin/settings')}
        >
          <FaCog className="text-indigo-600 text-3xl mb-2" />
          <div className="font-bold text-lg">System Settings</div>
          <div className="text-sm text-gray-600">Configure system preferences.</div>
        </button>
        <button
          className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center hover:bg-green-200 transition cursor-pointer"
          onClick={() => navigate('/dashboard/admin/modules')}
        >
          <FaClipboardList className="text-green-600 text-3xl mb-2" />
          <div className="font-bold text-lg">All Modules</div>
          <div className="text-sm text-gray-600">Access all platform modules.</div>
        </button>
        <button
          className="bg-yellow-100 rounded-xl p-6 shadow flex flex-col items-center hover:bg-yellow-200 transition cursor-pointer"
          onClick={() => navigate('/dashboard/admin/approvals')}
        >
          <FaCheckCircle className="text-yellow-600 text-3xl mb-2" />
          <div className="font-bold text-lg">Approval Panel</div>
          <div className="text-sm text-gray-600">View and approve pending users.</div>
        </button>
        <button
          className="bg-pink-100 rounded-xl p-6 shadow flex flex-col items-center hover:bg-pink-200 transition cursor-pointer"
          onClick={() => navigate('/dashboard/admin/audit-log')}
        >
          <FaHistory className="text-pink-600 text-3xl mb-2" />
          <div className="font-bold text-lg">Audit Log</div>
          <div className="text-sm text-gray-600">Track changes and export logs.</div>
        </button>
        <button
          className="bg-teal-100 rounded-xl p-6 shadow flex flex-col items-center hover:bg-teal-200 transition cursor-pointer"
          onClick={() => navigate('/dashboard/admin/projects')}
        >
          <FaProjectDiagram className="text-teal-600 text-3xl mb-2" />
          <div className="font-bold text-lg">Project Configuration</div>
          <div className="text-sm text-gray-600">Add/remove projects, assign users.</div>
        </button>
      </div>
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">System Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="font-semibold">Active Users</div>
            <div className="text-blue-600 font-bold text-lg">42</div>
          </div>
          <div>
            <div className="font-semibold">System Health</div>
            <div className="text-green-600 font-bold text-lg">Good</div>
          </div>
        </div>
      </div>
      {/* Approval Panel (for /dashboard/admin/approvals route) */}
      {/* <AdminUserManagement /> */}
      {/* Approval Panel (for /dashboard/admin/approvals route) */}
      {/* <AdminUserManagement /> */}

      <Outlet />
    </div>
  );
};

export default DashboardAdmin;
