import React from 'react';
import { Home, FileText, BarChart2, UploadCloud, Calendar, Users, ClipboardCheck, ShieldCheck } from 'lucide-react';
const modules = [
  { name: 'Dashboard Overview', icon: <Home />, route: '/dashboard/pm' },
  { name: 'Daily Reports', icon: <FileText />, route: '/dashboard/pm/daily-reports' },
  { name: 'QAQC', icon: <BarChart2 />, route: '/dashboard/pm/qaqc' },
  { name: 'Submittals', icon: <UploadCloud />, route: '/dashboard/pm/submittals' },
  { name: 'Schedule', icon: <Calendar />, route: '/dashboard/pm/schedule' },
  { name: 'Meetings', icon: <Users />, route: '/dashboard/pm/meetings' },
  { name: 'Cost', icon: <BarChart2 />, route: '/dashboard/pm/cost' },
];
export default function SidebarPM({ collapsed, setCollapsed }) {
  return (
    <aside className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-blue-50 to-slate-100 shadow-xl flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-blue-700">PM</span>
        <button onClick={() => setCollapsed && setCollapsed(c => !c)} className="text-blue-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {modules.map(mod => (
          <a key={mod.name} href={mod.route} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white bg-blue-500 hover:scale-105 transition-all duration-200 shadow-lg`}>
            <span className="text-xl">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
