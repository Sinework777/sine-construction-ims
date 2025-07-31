import React, { useState, useEffect } from 'react';
import SidebarPM from './SidebarPM';
import TopSectionPM from './TopSectionPM';
import ProfilePM from './ProfilePM';
import BuildProgress from '../../components/pm/BuildProgress';
import QuickActionsPM from './QuickActionsPM';
import projectData from './mockProjectData.json';
import { Outlet, useNavigate } from 'react-router-dom';

export default function DashboardPM() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [loadingTimeout, setLoadingTimeout] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/login');
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoadingTimeout(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Optionally, you can check for a real loading state from context or props
  // For now, just show fallback if loadingTimeout triggers

  if (loadingTimeout && document.querySelector('main')?.textContent?.includes('Loading')) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-slate-900">
        <div className="text-center">
          <div className="text-2xl font-bold mb-4">Still loading...</div>
          <div className="text-base text-slate-600 mb-2">This is taking longer than expected.</div>
          <div className="text-sm text-slate-500">Check your internet connection or Firestore permissions.</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex bg-gradient-to-br ${darkMode ? 'from-slate-900 via-slate-800 to-slate-700 text-slate-100' : 'from-blue-50 via-white to-blue-100 text-slate-900'} font-sans transition-colors duration-500`}>
      <SidebarPM collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <div className="flex-1 flex flex-col">
        {/* Top Nav */}
        <nav className="flex items-center justify-between px-4 py-3 shadow-xl ring-1 ring-slate-200/30 bg-white/80 backdrop-blur-lg sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <img src="https://cdn-icons-png.flaticon.com/512/2933/2933186.png" alt="Logo" className="w-10 h-10 rounded-2xl shadow-xl" />
            <span className="font-extrabold text-2xl tracking-tight">IMS PM Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-base px-2 py-1 rounded-xl bg-slate-200/60 shadow">{new Date().toLocaleString()}</span>
            <ProfilePM pmName={projectData.pmName} project={projectData.project} onLogout={handleLogout} />
            <button className="p-2 rounded-full hover:bg-slate-200 transition" onClick={() => setDarkMode(d => !d)}>
              {darkMode ? <span className="w-6 h-6 text-yellow-400">🌞</span> : <span className="w-6 h-6 text-slate-700">🌙</span>}
            </button>
          </div>
        </nav>
        <main className="flex-1 p-4 sm:p-8 md:p-12 bg-gradient-to-br from-white/80 to-blue-50 min-h-[calc(100vh-80px)] relative">
          {/* Build Progress Widget (visible during autopilot build) */}
          <BuildProgress currentPhase={7} />
          <TopSectionPM {...projectData} />
          <Outlet />
          <QuickActionsPM />
        </main>
      </div>
    </div>
  );
}
