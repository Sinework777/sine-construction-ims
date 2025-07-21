import React from 'react';
import { Home, FileText, BarChart2, ShieldCheck, ClipboardCheck, UploadCloud, Calendar, Users, Layers, Briefcase, ListChecks, CheckCircle, BookOpen, DollarSign, FileText as DocIcon, Settings, UserCheck, Lock } from 'lucide-react';
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
  { name: 'Approval Routing', icon: <CheckCircle />, route: '/dashboard/admin/approval-routing' },
  { name: 'Project Management', icon: <Briefcase />, route: '/dashboard/admin/project-management' },
];
export default function SidebarAdmin({ collapsed, setCollapsed }) {
  return (
    <aside className={`h-screen fixed left-0 top-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} bg-gradient-to-br from-red-50 to-slate-100 shadow-xl flex flex-col`}>
      <div className="flex items-center justify-between px-4 py-6">
        <span className="font-extrabold text-xl text-red-700">Admin</span>
        <button onClick={() => setCollapsed && setCollapsed(c => !c)} className="text-red-600 font-bold">{collapsed ? '>' : '<'}</button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 px-2">
        {modules.map(mod => (
          <a key={mod.name} href={mod.route} className={`flex items-center gap-3 px-3 py-2 rounded-xl font-semibold text-white bg-red-500 hover:scale-105 transition-all duration-200 shadow-lg`}>
            <span className="text-xl">{mod.icon}</span>
            {!collapsed && <span>{mod.name}</span>}
          </a>
        ))}
      </nav>
    </aside>
  );
}
