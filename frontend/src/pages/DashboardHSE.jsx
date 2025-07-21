import React, { useState } from 'react';
import SidebarHSE from '../components/SidebarHSE';
import React from 'react';
import { FaFireExtinguisher, FaHardHat, FaRegFileAlt, FaRegUser } from 'react-icons/fa';
export default function DashboardHSE() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex">
      <SidebarHSE collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 ml-20 md:ml-64 p-6">
        <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, HSE Officer</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-orange-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaFireExtinguisher className="text-orange-600 text-3xl mb-2" />
              <div className="font-bold text-lg">HSE Reports</div>
              <div className="text-sm text-gray-600">View and log HSE reports.</div>
            </div>
            <div className="bg-yellow-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaHardHat className="text-yellow-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Safety Observations</div>
              <div className="text-sm text-gray-600">Log safety observations.</div>
            </div>
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaRegFileAlt className="text-blue-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Incident Logs</div>
              <div className="text-sm text-gray-600">Track incident logs.</div>
            </div>
            <div className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaRegUser className="text-green-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Toolbox Talks</div>
              <div className="text-sm text-gray-600">Access toolbox talks.</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">HSE Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Open Incidents</div>
                <div className="text-orange-600 font-bold text-lg">1</div>
              </div>
              <div>
                <div className="font-semibold">Toolbox Talks</div>
                <div className="text-green-600 font-bold text-lg">3</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
