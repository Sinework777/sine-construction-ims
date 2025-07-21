import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { pmModules } from './modules';
import * as Icons from 'lucide-react';

export default function SidebarPM({ collapsed, onToggle }) {
  const location = useLocation();
  const current = location.pathname.split('/')[3] || 'home';
  return (
    <aside className={`h-full bg-white/80 shadow-xl flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} relative z-20`}>  
      <button className="absolute -right-4 top-4 bg-blue-600 text-white rounded-full shadow-xl p-2 hover:scale-110 transition" onClick={onToggle}>
        {collapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
      </button>
      <nav className="flex-1 flex flex-col gap-1 mt-16">
        {pmModules.map(m => (
          <Link
            key={m.key}
            to={`/dashboard/pm/${m.key}`}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-blue-100 hover:scale-105 ${current === m.key ? 'bg-blue-700 text-white scale-105 shadow-xl' : 'text-slate-700'} ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? m.label : ''}
          >
            <span className="text-xl">{Icons[m.icon] ? React.createElement(Icons[m.icon]) : React.createElement(Icons['Circle'])}</span>
            {!collapsed && <span className="ml-2 text-base">{m.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
