import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, FileText, BarChart2, ShieldCheck, ClipboardCheck, UploadCloud, Calendar, Users, Layers, Briefcase, ListChecks, CheckCircle, BookOpen, DollarSign, FileText as DocIcon, Settings, UserCheck, Lock, KeyRound, Flag, Clock, Shield, Database, HelpCircle, Store } from 'lucide-react';
// Example: To add a new module, add an object to this array with name, icon, and route.
const modules = [
  { name: 'Dashboard Overview', icon: <Home />, route: '/dashboard/admin' },
  { name: 'Daily Reports', icon: <FileText />, route: '/dashboard/admin/daily-reports' },
  { name: 'QA/QC', icon: <BarChart2 />, route: '/dashboard/admin/qaqc' },
  { name: 'HSE Reports', icon: <ShieldCheck />, route: '/dashboard/admin/hse' },
  { name: 'Submittals', icon: <UploadCloud />, route: '/dashboard/admin/submittals' },
  { name: 'Document Control', icon: <DocIcon />, route: '/dashboard/admin/document-control' },
  { name: 'Schedule', icon: <Calendar />, route: '/dashboard/admin/schedule' },
  { name: 'BOQ / Quantity Survey', icon: <Layers />, route: '/dashboard/admin/boq' },
  { name: 'Meetings & Minutes', icon: <Users />, route: '/dashboard/admin/meetings' },
  { name: 'RFIs', icon: <BookOpen />, route: '/dashboard/admin/rfis' },
  { name: 'Material Logs', icon: <ClipboardCheck />, route: '/dashboard/admin/material-logs' },
  { name: 'Approvals', icon: <CheckCircle />, route: '/dashboard/admin/approvals' },
  { name: 'Cost Summary', icon: <DollarSign />, route: '/dashboard/admin/cost' },
  { name: 'Audit Logs', icon: <Briefcase />, route: '/dashboard/admin/audit-logs' },
  { name: 'Site Reports', icon: <ListChecks />, route: '/dashboard/admin/site-reports' },
  { name: 'Admin Users', icon: <UserCheck />, route: '/dashboard/admin/users' },
  { name: 'Admin Settings', icon: <Settings />, route: '/dashboard/admin/settings' },
  { name: 'Module Access Control', icon: <Lock />, route: '/dashboard/admin/access-control' },
  { name: 'API Keys', icon: <KeyRound />, route: '/dashboard/admin/api-keys' },
  { name: 'Feature Flags', icon: <Flag />, route: '/dashboard/admin/feature-flags' },
  { name: 'Scheduled Tasks', icon: <Clock />, route: '/dashboard/admin/scheduled-tasks' },
  { name: 'Licenses', icon: <Shield />, route: '/dashboard/admin/licenses' },
  { name: 'Data & Backup', icon: <Database />, route: '/dashboard/admin/data-backup' },
  { name: 'Monitoring', icon: <BarChart2 />, route: '/dashboard/admin/monitoring' },
  { name: 'Support', icon: <HelpCircle />, route: '/dashboard/admin/support' },
  { name: 'Module Marketplace', icon: <Store />, route: '/admin/marketplace' },
];
export default function SidebarAdmin({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-red-50 to-slate-100 shadow-xl flex flex-col`}
      role="navigation"
      aria-label="System Admin Sidebar"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Tab') return;
        if (e.key === 'ArrowLeft' && !collapsed) setCollapsed && setCollapsed(true);
        if (e.key === 'ArrowRight' && collapsed) setCollapsed && setCollapsed(false);
      }}
    >
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-red-700">Admin</span>
        <button aria-label="Toggle sidebar" onClick={() => setCollapsed && setCollapsed(c => !c)} className="text-red-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2" aria-label="Admin Modules">
        {modules.map(mod => (
          <NavLink
            key={mod.name}
            to={mod.route}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-200 shadow-lg ${isActive ? 'bg-red-700 text-white scale-105' : 'bg-red-500 text-white hover:scale-105'}`
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
