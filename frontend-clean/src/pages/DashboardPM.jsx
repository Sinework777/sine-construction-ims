
import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import SidebarPM from '../components/SidebarPM';
import QuickActionsPM from './pm/QuickActionsPM';
import TopSectionPM from './pm/TopSectionPM';
import ProfilePM from './pm/ProfilePM';
import projectData from './pm/mockProjectData.json';
import BuildProgress from '../components/pm/BuildProgress';

const DashboardPM = () => {
  const [reports, setReports] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');
  };
  useEffect(() => {
    // Firestore-native: fetch reports from 'reports' collection
    async function fetchReports() {
      try {
        const snapshot = await getDocs(collection(db, 'reports'));
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReports(data);
      } catch {
        setReports([]);
      }
    }
    fetchReports();
  }, []);
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
          {/* Build Progress Widget (visible during autopilot build) */}
          <BuildProgress currentPhase={0} />
          <TopSectionPM {...projectData} />
          <Outlet />
          <QuickActionsPM />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            {reports.length === 0 ? (
              <div className="col-span-full text-center text-xl text-gray-500 py-12">
                No reports found. Please add data to Firestore or check your connection.
              </div>
            ) : (
              reports.map(r => (
                <div key={r.id} className="bg-green-100 rounded-xl p-6 shadow flex flex-col items-center">
                  <div className="font-bold text-lg">{r.title}</div>
                  <div className="text-sm text-gray-600">Status: {r.status}</div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPM;
