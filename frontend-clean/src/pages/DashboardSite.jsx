import React from 'react';
import { useState } from 'react';
import SidebarSite from '../components/SidebarSite';
import { FaClipboardList, FaUsers, FaTools, FaRegFileAlt } from 'react-icons/fa';
export default function DashboardSite() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex">
      <SidebarSite collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 ml-20 md:ml-64 p-6">
        <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, Superintendent / Site Lead</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaClipboardList className="text-blue-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Daily Reports</div>
              <div className="text-sm text-gray-600">View and submit daily reports.</div>
            </div>
            <div className="bg-indigo-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaUsers className="text-indigo-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Manpower</div>
              <div className="text-sm text-gray-600">Track manpower usage.</div>
            </div>
            <div className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaTools className="text-green-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Equipment Logs</div>
              <div className="text-sm text-gray-600">Monitor equipment logs.</div>
            </div>
            <div className="bg-yellow-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaRegFileAlt className="text-yellow-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Work Execution Logs</div>
              <div className="text-sm text-gray-600">Log work execution details.</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Site Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Open Reports</div>
                <div className="text-blue-600 font-bold text-lg">4</div>
              </div>
              <div>
                <div className="font-semibold">Equipment Issues</div>
                <div className="text-green-600 font-bold text-lg">1</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
