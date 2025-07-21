// ...existing code...
import { useNavigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SidebarPM from '../components/SidebarPM';
import QuickActionsPM from './pm/QuickActionsPM';
import TopSectionPM from './pm/TopSectionPM';
import ProfilePM from './pm/ProfilePM';
import projectData from './pm/mockProjectData.json';

export default function DashboardPM() {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const user = (() => {
    const session = JSON.parse(localStorage.getItem('sessionUser'));
    return session && session.role === 'pm' ? session : null;
  })();
  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);
  function handleLogout() {
    localStorage.removeItem('sessionUser');
    navigate('/login');
  }
  return (
    <div className={`min-h-screen flex bg-gradient-to-br ${darkMode ? 'from-slate-900 via-slate-800 to-slate-700 text-slate-100' : 'from-blue-50 via-white to-blue-100 text-slate-900'} font-sans transition-colors duration-500`}>
      <SidebarPM collapsed={collapsed} setCollapsed={setCollapsed} />
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
          <TopSectionPM {...projectData} />
          <Outlet />
          <QuickActionsPM />
        </main>
      </div>
    </div>
  );
}
