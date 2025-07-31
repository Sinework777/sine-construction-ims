import React from 'react';
import { Home, FileText, AlertTriangle, ClipboardCheck, ShieldCheck, BarChart2, Bell, Settings, Users, UploadCloud } from 'lucide-react';

const modules = [
  { name: 'Dashboard Overview', icon: <Home />, route: '/dashboard/hse', color: 'bg-blue-500' },
  { name: 'HSE Daily Reports', icon: <FileText />, route: '/dashboard/hse/daily-reports', color: 'bg-indigo-500' },
  { name: 'Incident Reports', icon: <AlertTriangle />, route: '/dashboard/hse/incident-reports', color: 'bg-red-500' },
  { name: 'Near Miss Reports', icon: <ClipboardCheck />, route: '/dashboard/hse/near-miss', color: 'bg-yellow-500' },
  { name: 'Toolbox Talks & Safety Meetings', icon: <ShieldCheck />, route: '/dashboard/hse/toolbox-talks', color: 'bg-green-500' },
  { name: 'Safety Observation Cards', icon: <BarChart2 />, route: '/dashboard/hse/safety-observation', color: 'bg-purple-500' },
  { name: 'Safety Equipment Log', icon: <UploadCloud />, route: '/dashboard/hse/equipment-log', color: 'bg-pink-500' },
  { name: 'Permits to Work (PTW)', icon: <FileText />, route: '/dashboard/hse/ptw', color: 'bg-orange-500' },
  { name: 'OSHA Forms & EM385 Checklists', icon: <ClipboardCheck />, route: '/dashboard/hse/osha-checklists', color: 'bg-teal-500' },
  { name: 'Risk Assessments (JSA/JHA)', icon: <ShieldCheck />, route: '/dashboard/hse/risk-assessments', color: 'bg-cyan-500' },
  { name: 'Training & Certifications', icon: <Users />, route: '/dashboard/hse/training', color: 'bg-lime-500' },
  { name: 'Site Safety Analytics', icon: <BarChart2 />, route: '/dashboard/hse/analytics', color: 'bg-blue-700' },
  { name: 'Export Reports', icon: <UploadCloud />, route: '/dashboard/hse/export', color: 'bg-gray-500' },
];

export default function HSESidebar({ collapsed, setCollapsed }) {
  return (
    <aside className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-blue-50 to-slate-100 shadow-xl flex flex-col`}> 
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-blue-700">HSE</span>
        <button onClick={() => setCollapsed(c => !c)} className="text-blue-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {modules.map(mod => (
          <a key={mod.name} href={mod.route} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white ${mod.color} hover:scale-105 transition-all duration-200 shadow-lg`}>
            <span className="text-xl">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
