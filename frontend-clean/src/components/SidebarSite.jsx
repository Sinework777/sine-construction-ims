import React from 'react';
import { FileText, ShieldCheck, ClipboardCheck, Users } from 'lucide-react';
const modules = [
  { name: 'Daily Reports', icon: <FileText />, route: '/dashboard/site/daily-reports' },
  { name: 'HSE', icon: <ShieldCheck />, route: '/dashboard/site/hse' },
  { name: 'Material Logs', icon: <ClipboardCheck />, route: '/dashboard/site/material-logs' },
  { name: 'Meetings', icon: <Users />, route: '/dashboard/site/meetings' },
];
export default function SidebarSite({ collapsed, setCollapsed }) {
  return (
    <aside className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-gray-50 to-slate-100 shadow-xl flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-gray-700">Site Lead</span>
        <button onClick={() => setCollapsed && setCollapsed(c => !c)} className="text-gray-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {modules.map(mod => (
          <a key={mod.name} href={mod.route} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white bg-gray-500 hover:scale-105 transition-all duration-200 shadow-lg`}>
            <span className="text-xl">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
