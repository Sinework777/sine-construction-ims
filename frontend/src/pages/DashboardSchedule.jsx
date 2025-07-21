import React, { useState } from 'react';
import { FaChartBar, FaCheckCircle } from 'react-icons/fa';
import SidebarSchedule from '../components/SidebarSchedule';
export default function DashboardSchedule() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex">
      <SidebarSchedule collapsed={collapsed} setCollapsed={setCollapsed} />
      <main className="flex-1 ml-20 md:ml-64 p-6">
        <div className="w-full max-w-6xl mx-auto py-8 px-4 sm:px-8">
          <h1 className="text-3xl font-bold mb-6">Welcome, Scheduler / Planner</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-blue-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaChartBar className="text-blue-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Gantt View</div>
              <div className="text-sm text-gray-600">View project Gantt chart.</div>
            </div>
            <div className="bg-indigo-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaCheckCircle className="text-indigo-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Milestones</div>
              <div className="text-sm text-gray-600">Track project milestones.</div>
            </div>
            <div className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center">
              <FaChartBar className="text-green-600 text-3xl mb-2" />
              <div className="font-bold text-lg">Progress Logs</div>
              <div className="text-sm text-gray-600">Monitor progress logs.</div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-bold mb-4">Schedule Status</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-semibold">Upcoming Milestones</div>
                <div className="text-indigo-600 font-bold text-lg">3</div>
              </div>
              <div>
                <div className="font-semibold">Progress</div>
                <div className="text-green-600 font-bold text-lg">72%</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
