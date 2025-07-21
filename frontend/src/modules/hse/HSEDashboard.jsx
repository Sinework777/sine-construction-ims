import React from 'react';
import { Outlet } from 'react-router-dom';
import HSESidebar from './HSESidebar.jsx';
import TopNavBar from '../../components/TopNavBar.jsx';
import QuickActionButton from '../../components/QuickActionButton.jsx';

export default function HSEDashboard() {
  const user = {
    name: 'HSE Officer',
    role: 'HSE',
    project: 'Project Alpha',
    avatar: 'https://ui-avatars.com/api/?name=HSE+Officer',
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <HSESidebar />
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top NavBar */}
        <TopNavBar user={user} />
        {/* Quick Actions */}
        <div className="px-6 pt-4 flex gap-4">
          <QuickActionButton label="New Incident Report" icon="FilePlus" to="/dashboard/hse/incident-reports/new" />
          <QuickActionButton label="New Near Miss" icon="AlertTriangle" to="/dashboard/hse/near-miss/new" />
          <QuickActionButton label="New Toolbox Talk" icon="ClipboardCheck" to="/dashboard/hse/toolbox-talks/new" />
          <QuickActionButton label="Export" icon="Download" to="/dashboard/hse/export" />
        </div>
        {/* Main HSE module content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Render HSE submodules via router */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
