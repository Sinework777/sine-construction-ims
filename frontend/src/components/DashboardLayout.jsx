import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar.jsx';
import SidebarQAQC from './SidebarQAQC.jsx';

export default function DashboardLayout() {
  // Use localStorage for user and logout
  const user = JSON.parse(localStorage.getItem('sessionUser')) || { name: 'User', role: 'Admin' };
  const logout = () => {
    localStorage.removeItem('sessionUser');
    window.location.href = '/login';
  };
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const role = user?.role || 'Admin';

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-xl ring-1 ring-slate-200/30 bg-white/80 backdrop-blur-lg sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img src="https://cdn-icons-png.flaticon.com/512/2933/2933186.png" alt="Logo" className="w-10 h-10 rounded-2xl shadow-xl" />
          <span className="font-extrabold text-2xl tracking-tight">IMS Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold">{user?.name || 'User'}</span>
          <span className="font-mono text-base px-2 py-1 rounded-xl bg-slate-200/60 shadow">{role}</span>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700 transition" onClick={() => { logout(); navigate('/login'); }}>Logout</button>
        </div>
      </header>
      <div className="flex flex-1 min-h-0">
        {role === 'QAQC' ? (
          <SidebarQAQC collapsed={collapsed} setCollapsed={setCollapsed} />
        ) : (
          <Sidebar role={role} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
        )}
        <main className="flex-1 p-4 sm:p-8 md:p-12 bg-gradient-to-br from-white/80 to-blue-50 min-h-[calc(100vh-80px)] relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
