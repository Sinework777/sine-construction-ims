import React from 'react';
import { ShieldCheck, FileText, ListChecks, UploadCloud, BarChart2, Bell, Settings, Users } from 'lucide-react';

const modules = [
  { name: 'QA/QC Reports', icon: <FileText />, route: '/dashboard/qaqc/reports', color: 'bg-blue-500' },
  { name: 'NCRs', icon: <BarChart2 />, route: '/dashboard/qaqc/ncrs', color: 'bg-indigo-500' },
  { name: 'Inspection Checklists', icon: <ListChecks />, route: '/dashboard/qaqc/checklists', color: 'bg-green-500' },
  { name: 'Submittals', icon: <UploadCloud />, route: '/dashboard/qaqc/submittals', color: 'bg-yellow-500' },
  { name: 'Approvals', icon: <ShieldCheck />, route: '/dashboard/qaqc/approvals', color: 'bg-purple-500' },
  { name: 'Analytics', icon: <BarChart2 />, route: '/dashboard/qaqc/analytics', color: 'bg-pink-500' },
  { name: 'Notifications', icon: <Bell />, route: '/dashboard/qaqc/notifications', color: 'bg-orange-500' },
  { name: 'Settings', icon: <Settings />, route: '/dashboard/qaqc/settings', color: 'bg-slate-500' },
];

export default function SidebarQAQC({ collapsed, setCollapsed }) {
  return (
    <aside className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-blue-50 to-slate-100 shadow-xl flex flex-col`}> 
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-blue-700">QA/QC</span>
        <button onClick={() => setCollapsed(c => !c)} className="text-blue-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {modules.map((mod) => (
          <a key={mod.name} href={mod.route} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white ${mod.color} hover:scale-105 transition-all duration-200 shadow-lg`}>
            <span className="text-xl">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
