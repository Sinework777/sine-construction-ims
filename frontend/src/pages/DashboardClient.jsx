import React, { useState } from 'react';
import { FaChartBar, FaClipboardList, FaUpload, FaMoneyBillWave } from 'react-icons/fa';
import SidebarClient from '../components/SidebarClient';
export default function DashboardClient() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex">
      <SidebarClient collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 ml-20 md:ml-64 p-6">
        <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, Client / Owner</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaChartBar className="text-blue-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Project Overview</div>
              <div className="text-sm text-gray-600">View overall project status.</div>
            </div>
            <div className="bg-indigo-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaClipboardList className="text-indigo-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Reports</div>
              <div className="text-sm text-gray-600">Access project reports.</div>
            </div>
            <div className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaUpload className="text-green-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Submittal Status</div>
              <div className="text-sm text-gray-600">Check submittal status.</div>
            </div>
            <div className="bg-yellow-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaMoneyBillWave className="text-yellow-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Financials</div>
              <div className="text-sm text-gray-600">View financial summaries.</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Project Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Progress</div>
                <div className="text-green-600 font-bold text-lg">85%</div>
              </div>
              <div>
                <div className="font-semibold">Pending Submittals</div>
                <div className="text-blue-600 font-bold text-lg">2</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
