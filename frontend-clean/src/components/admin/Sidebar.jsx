// src/components/admin/Sidebar.jsx
import React from 'react';
import { FaUsers, FaProjectDiagram, FaCogs, FaClipboardList, FaChartPie, FaCog, FaSignOutAlt, FaBoxes, FaKey, FaHistory } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const links = [
  { to: '/admin/dashboard', icon: <FaChartPie />, label: 'Overview' },
  { to: '/admin/users', icon: <FaUsers />, label: 'Users' },
  { to: '/admin/projects', icon: <FaProjectDiagram />, label: 'Projects' },
  { to: '/admin/modules', icon: <FaBoxes />, label: 'Modules' },
  { to: '/admin/roles', icon: <FaKey />, label: 'Roles' },
  { to: '/admin/settings', icon: <FaCog />, label: 'Settings' },
  { to: '/admin/logs', icon: <FaHistory />, label: 'Logs' },
];

export default function Sidebar() {
  const location = useLocation();
  return (
    <aside className="w-20 md:w-64 bg-white shadow-xl flex flex-col min-h-screen">
      <div className="h-16 flex items-center justify-center md:justify-start px-4 border-b">
        <span className="font-bold text-xl text-blue-700">IMS Admin</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2 mt-6">
        {links.map(link => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mx-2 my-1 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 font-medium ${location.pathname === link.to ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="hidden md:inline">{link.label}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto p-4">
        <button className="flex items-center gap-2 text-red-600 hover:text-red-800 font-semibold w-full"><FaSignOutAlt /> <span className="hidden md:inline">Logout</span></button>
      </div>
    </aside>
  );
}
