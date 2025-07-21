import React from 'react';
import { DollarSign, Layers, FileText, UploadCloud } from 'lucide-react';
const modules = [
  { name: 'BOQ / Quantity Survey', icon: <Layers />, route: '/dashboard/cost/boq' },
  { name: 'Cost Tracker', icon: <DollarSign />, route: '/dashboard/cost/tracker' },
  { name: 'Submittals', icon: <UploadCloud />, route: '/dashboard/cost/submittals' },
  { name: 'Daily Reports', icon: <FileText />, route: '/dashboard/cost/daily-reports' },
];
export default function SidebarCost({ collapsed, setCollapsed }) {
  return (
    <aside className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-emerald-50 to-slate-100 shadow-xl flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-emerald-700">Cost/QS</span>
        <button onClick={() => setCollapsed && setCollapsed(c => !c)} className="text-emerald-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {modules.map(mod => (
          <a key={mod.name} href={mod.route} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white bg-emerald-500 hover:scale-105 transition-all duration-200 shadow-lg`}>
            <span className="text-xl">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
