import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { useAuth } from '../context/useAuth';

const modules = [
	{ key: 'overview', label: 'Dashboard Overview', icon: 'Home', route: '/dashboard/qaqc' },
	{ key: 'reports', label: 'QA/QC Reports', icon: 'FileText', route: '/dashboard/qaqc/reports' },
	{ key: 'ncrs', label: 'NCRs', icon: 'BarChart2', route: '/dashboard/qaqc/ncrs', badge: 2 },
	{ key: 'checklists', label: 'Checklists', icon: 'ListChecks', route: '/dashboard/qaqc/checklists' },
	{ key: 'inspections', label: 'Inspections', icon: 'ClipboardCheck', route: '/dashboard/qaqc/inspections' },
	{ key: 'approvals', label: 'Approvals', icon: 'ShieldCheck', route: '/dashboard/qaqc/approvals' },
	{ key: 'summary', label: 'Summary & Charts', icon: 'BarChart2', route: '/dashboard/qaqc/summary' },
	{ key: 'reports-export', label: 'Export Reports', icon: 'UploadCloud', route: '/dashboard/qaqc/reports-export' },
	{ key: 'submittals', label: 'Submittals', icon: 'UploadCloud', route: '/dashboard/qaqc/submittals' },
	{ key: 'notifications', label: 'Notifications', icon: 'Bell', route: '/dashboard/qaqc/notifications', badge: 3 },
	{ key: 'settings', label: 'Settings', icon: 'Settings', route: '/dashboard/qaqc/settings' },
];

export default function Sidebar({ collapsed, setCollapsed, onToggle }) {
	const location = useLocation();
	const current = location.pathname.split('/')[3] || 'overview';
	const handleToggle = onToggle ? onToggle : () => setCollapsed && setCollapsed(c => !c);
	const { logout } = useAuth();

	return (
		<aside className={`h-full bg-white/80 shadow-xl flex flex-col transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} relative z-20`}>
			<button className="absolute -right-4 top-4 bg-blue-600 text-white rounded-full shadow-xl p-2 hover:scale-110 transition" onClick={handleToggle}>
				{collapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />}
			</button>
			<nav className="flex-1 flex flex-col gap-1 mt-16">
				{modules.map(m => (
					<Link
						key={m.key}
						to={m.route}
						className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-blue-100 hover:scale-105 ${current === m.key ? 'bg-blue-700 text-white scale-105 shadow-xl' : 'text-slate-700'} ${collapsed ? 'justify-center px-2' : ''}`}
						title={collapsed ? m.label : ''}
					>
						<span className="text-xl">{Icons[m.icon] ? React.createElement(Icons[m.icon]) : React.createElement(Icons['Circle'])}</span>
						{!collapsed && <span className="ml-2 text-base">{m.label}</span>}
						{m.badge && <span className="ml-auto bg-pink-500 text-xs rounded-full px-2 font-bold">{m.badge}</span>}
					</Link>
				))}
			</nav>
			<button onClick={logout} className="w-full mt-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
				Logout
			</button>
		</aside>
	);
}
