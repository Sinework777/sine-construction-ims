import React from 'react';
import { Calendar, FileText, Users } from 'lucide-react';
const modules = [
  { name: 'Schedule (Gantt)', icon: <Calendar />, route: '/dashboard/schedule/gantt' },
  { name: 'Milestones', icon: <Calendar />, route: '/dashboard/schedule/milestones' },
  { name: 'Daily Reports', icon: <FileText />, route: '/dashboard/schedule/daily-reports' },
  { name: 'Meetings/Minutes', icon: <Users />, route: '/dashboard/schedule/meetings' },
];
export default function SidebarSchedule({ collapsed, setCollapsed }) {
  return (
    <aside className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-purple-50 to-slate-100 shadow-xl flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-purple-700">Scheduler</span>
        <button onClick={() => setCollapsed && setCollapsed(c => !c)} className="text-purple-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {modules.map(mod => (
          <a key={mod.name} href={mod.route} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white bg-purple-500 hover:scale-105 transition-all duration-200 shadow-lg`}>
            <span className="text-xl">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
