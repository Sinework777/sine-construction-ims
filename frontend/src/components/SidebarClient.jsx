import React from 'react';
import { FileText, UploadCloud, BarChart2, Calendar } from 'lucide-react';
const modules = [
  { name: 'Daily Reports (Read-only)', icon: <FileText />, route: '/dashboard/client/daily-reports' },
  { name: 'View Submittals', icon: <UploadCloud />, route: '/dashboard/client/submittals' },
  { name: 'QA Summary', icon: <BarChart2 />, route: '/dashboard/client/qaqc-summary' },
  { name: 'Schedule Summary', icon: <Calendar />, route: '/dashboard/client/schedule-summary' },
];
export default function SidebarClient({ collapsed, setCollapsed }) {
  return (
    <aside className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-pink-50 to-slate-100 shadow-xl flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-pink-700">Client</span>
        <button onClick={() => setCollapsed && setCollapsed(c => !c)} className="text-pink-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {modules.map(mod => (
          <a key={mod.name} href={mod.route} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white bg-pink-500 hover:scale-105 transition-all duration-200 shadow-lg`}>
            <span className="text-xl">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
