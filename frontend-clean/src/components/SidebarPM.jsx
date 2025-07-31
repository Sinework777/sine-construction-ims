import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, BarChart2, UploadCloud, Calendar, Users, ClipboardCheck, ShieldCheck } from 'lucide-react';
// Example: To add a new module, add an object to this array with name, icon, and route.
const modules = [
  { name: 'Dashboard Overview', icon: <Home />, route: '/dashboard' },
  { name: 'Daily Reports', icon: <FileText />, route: '/dashboard/daily-reports' },
  { name: 'QAQC', icon: <BarChart2 />, route: '/dashboard/qaqc' },
  { name: 'Submittals', icon: <UploadCloud />, route: '/dashboard/submittals' },
  { name: 'Schedule', icon: <Calendar />, route: '/dashboard/schedule' },
  { name: 'Meetings', icon: <Users />, route: '/dashboard/meetings' },
  { name: 'Cost', icon: <BarChart2 />, route: '/dashboard/cost' },
];
export default function SidebarPM({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-blue-50 to-slate-100 shadow-xl flex flex-col`}
      role="navigation"
      aria-label="Project Manager Sidebar"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Tab') return;
        if (e.key === 'ArrowLeft' && !collapsed) setCollapsed && setCollapsed(true);
        if (e.key === 'ArrowRight' && collapsed) setCollapsed && setCollapsed(false);
      }}
    >
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-blue-700">PM</span>
        <button aria-label="Toggle sidebar" onClick={() => setCollapsed && setCollapsed(c => !c)} className="text-blue-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2" aria-label="PM Modules">
        {modules.map(mod => (
          <NavLink
            key={mod.name}
            to={mod.route}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-lg ${isActive ? 'bg-blue-700 text-white scale-105' : 'bg-blue-500 text-white hover:scale-105'}`
            }
            tabIndex={0}
            aria-label={mod.name}
          >
            <span className="text-xl" aria-hidden="true">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
