import React, { useState } from 'react';
import SidebarCost from '../components/SidebarCost';
import { FaChartBar, FaClipboardList, FaMoneyBillWave, FaRegClock } from 'react-icons/fa';
export default function DashboardCost() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex">
      <SidebarCost collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 ml-20 md:ml-64 p-6">
        <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, Cost Engineer</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaChartBar className="text-blue-600 text-3xl mb-2" />
              <div className="font-bold text-lg">BOQ</div>
              <div className="text-sm text-gray-600">View and manage bill of quantities.</div>
            </div>
            <div className="bg-indigo-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaClipboardList className="text-indigo-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Quantity Survey</div>
              <div className="text-sm text-gray-600">Track quantity surveys.</div>
            </div>
            <div className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaMoneyBillWave className="text-green-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Cost Logs</div>
              <div className="text-sm text-gray-600">Monitor cost logs.</div>
            </div>
            <div className="bg-yellow-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaRegClock className="text-yellow-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Payment Tracking</div>
              <div className="text-sm text-gray-600">Track payments and invoices.</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Cost Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Open Payments</div>
                <div className="text-yellow-600 font-bold text-lg">2</div>
              </div>
              <div>
                <div className="font-semibold">Pending Surveys</div>
                <div className="text-indigo-600 font-bold text-lg">3</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
