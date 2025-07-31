import React from 'react';
import { ShieldCheck, FileText, AlertTriangle, ClipboardCheck, CheckCircle } from 'lucide-react';
const modules = [
  { name: 'HSE Dashboard', icon: <ShieldCheck />, route: '/dashboard/hse' },
  { name: 'Incident Reports', icon: <AlertTriangle />, route: '/dashboard/hse/incident-reports' },
  { name: 'Near Misses', icon: <AlertTriangle />, route: '/dashboard/hse/near-miss' },
  { name: 'Toolbox Talks', icon: <ClipboardCheck />, route: '/dashboard/hse/toolbox-talks' },
  { name: 'Safety Checklist', icon: <ClipboardCheck />, route: '/dashboard/hse/safety-checklist' },
  { name: 'Daily Reports', icon: <FileText />, route: '/dashboard/hse/daily-reports' },
  { name: 'Approvals', icon: <CheckCircle />, route: '/dashboard/hse/approvals' },
];
export default function SidebarHSE({ collapsed, setCollapsed }) {
  return (
    <aside className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-green-50 to-slate-100 shadow-xl flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-green-700">HSE</span>
        <button onClick={() => setCollapsed && setCollapsed(c => !c)} className="text-green-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {modules.map(mod => (
          <a key={mod.name} href={mod.route} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white bg-green-500 hover:scale-105 transition-all duration-200 shadow-lg`}>
            <span className="text-xl">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
