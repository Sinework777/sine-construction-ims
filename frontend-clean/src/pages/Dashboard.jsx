

import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  FaBell, FaUserCircle, FaChevronLeft, FaChevronRight, FaSignOutAlt, FaCog, FaMoon, FaSun, FaProjectDiagram, FaCalendarAlt, FaClipboardList, FaTools, FaFireExtinguisher, FaUpload, FaQuestionCircle, FaChartBar, FaBoxOpen, FaFolderOpen, FaFileAlt, FaRegFileAlt, FaUsers, FaCamera, FaThumbtack, FaRegClock, FaUserCheck, FaWrench, FaCogs, FaRegCalendarCheck, FaRegListAlt, FaRegUser, FaPlus,
} from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';

// Placeholder for dashboard modules/components
const modules = [
  { key: 'DashboardHome', label: 'Dashboard Home', icon: <FaProjectDiagram /> },
  { key: 'DailyReports', label: 'Daily Reports', icon: <FaClipboardList /> },
  { key: 'QAQCReports', label: 'QA/QC Reports', icon: <FaTools />, roles: ['qaqc', 'System Admin', 'Super Admin'] },
  { key: 'HSEObservations', label: 'HSE Observations', icon: <FaFireExtinguisher />, roles: ['hse', 'System Admin', 'Super Admin'] },
  { key: 'Submittals', label: 'Submittals', icon: <FaUpload /> },
  { key: 'RFIManagement', label: 'RFI Management', icon: <FaQuestionCircle /> },
  { key: 'BOQQuantitySurvey', label: 'BOQ & Quantity Survey', icon: <FaChartBar /> },
  { key: 'MaterialLogs', label: 'Material Logs', icon: <FaBoxOpen /> },
  { key: 'DocumentControl', label: 'Document Control', icon: <FaFolderOpen /> },
  { key: 'Specifications', label: 'Specifications', icon: <FaFileAlt /> },
  { key: 'MeetingMinutes', label: 'Meeting Minutes', icon: <FaRegFileAlt /> },
  { key: 'ProgressSchedule', label: 'Progress Schedule & Gantt', icon: <FaCalendarAlt /> },
  { key: 'Timesheets', label: 'Timesheets', icon: <FaRegClock /> },
  { key: 'AttendanceTracker', label: 'Attendance Tracker', icon: <FaUserCheck /> },
  { key: 'MediaGallery', label: 'Media Gallery', icon: <FaCamera /> },
  { key: 'IssueTracker', label: 'Issue Tracker', icon: <FaThumbtack /> },
  { key: 'ToolboxTalks', label: 'Toolbox Talks', icon: <FaWrench /> },
  { key: 'AssetRegister', label: 'Asset Register', icon: <FaCogs /> },
  { key: 'UserManagement', label: 'User Management', icon: <FaUsers />, roles: ['System Admin', 'Super Admin'] },
  { key: 'Settings', label: 'Settings', icon: <FaCog /> },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser, userRole, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [tab, setTab] = useState('DashboardHome');
  const [now, setNow] = useState(new Date());
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // ...existing code...

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate('/login');
    }
  }, [loading, currentUser, navigate]);

  if (loading) return <div style={{textAlign:'center',marginTop:'20vh'}}>Loading...</div>;
  if (!currentUser) return null;

  return (
    <div className={
      `min-h-screen flex flex-col bg-gradient-to-br ${darkMode ? 'from-slate-900 via-slate-800 to-slate-700 text-slate-100' : 'from-blue-50 via-white to-blue-100 text-slate-900'} font-sans transition-colors duration-500`
    }>
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-4 py-3 shadow-xl ring-1 ring-slate-200/30 bg-white/80 backdrop-blur-lg sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <img src="https://cdn-icons-png.flaticon.com/512/2933/2933186.png" alt="Logo" className="w-10 h-10 rounded-2xl shadow-xl" />
          <span className="font-extrabold text-2xl tracking-tight">IMS Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-mono text-base px-2 py-1 rounded-xl bg-slate-200/60 shadow">{now.toLocaleString()}</span>
          <div className="relative">
            <button className="p-2 rounded-full hover:bg-slate-200 transition" onClick={() => setNotifOpen(o => !o)}>
              <FaBell className="w-6 h-6" />
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl ring-1 ring-slate-200 z-40 p-4 animate-fade-in">
                <div className="font-bold mb-2">Notifications</div>
                <div className="text-sm text-slate-700">No new notifications.</div>
              </div>
            )}
          </div>
          <div className="relative">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition" onClick={() => setProfileOpen(o => !o)}>
              <FaUserCircle className="w-6 h-6" />
              <span className="font-semibold">{currentUser.email}</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-slate-200 z-40 p-4 animate-fade-in">
                <div className="font-bold mb-2">{currentUser.email}</div>
                <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-100 transition" onClick={() => {}}>My Account</button>
                <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-100 transition" onClick={() => {}}>Preferences</button>
                <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-100 transition" onClick={() => { window.location.href = '/login'; }}><FaSignOutAlt className="inline mr-2" />Logout</button>
              </div>
            )}
          </div>
          <button className="p-2 rounded-full hover:bg-slate-200 transition" onClick={() => setDarkMode(d => !d)}>
            {darkMode ? <FaSun className="w-6 h-6 text-yellow-400" /> : <FaMoon className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
      </nav>
      {/* Layout */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className={`h-full bg-white/80 backdrop-blur-lg shadow-xl ring-1 ring-slate-200/30 flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} relative z-20`}>
          <button className="absolute -right-4 top-4 bg-blue-600 text-white rounded-full shadow-xl p-2 hover:scale-110 transition" onClick={() => setSidebarOpen(o => !o)}>
            {sidebarOpen ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
          <nav className="flex-1 flex flex-col gap-1 mt-16 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 pr-2">
            {modules.filter(m => {
              if (!m.roles) return true; // No role restriction
              if (!userRole) return false;
              return m.roles.includes(userRole);
            }).map(m => (
              <button
                key={m.key}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-blue-100 hover:scale-105 ${tab === m.key ? 'bg-blue-700 text-white scale-105 shadow-xl' : 'text-slate-700'} ${!sidebarOpen ? 'justify-center px-2' : ''}`}
                onClick={() => setTab(m.key)}
                title={sidebarOpen ? '' : m.label}
              >
                <span className="text-xl">{m.icon}</span>
                {sidebarOpen && <span className="ml-2 text-base">{m.label}</span>}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-8 md:p-12 bg-gradient-to-br from-white/80 to-blue-50 min-h-[calc(100vh-80px)] relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="min-h-[60vh]"
            >
              <div className="bg-white/80 rounded-2xl shadow-xl ring-1 ring-blue-200 p-8 flex flex-col items-center justify-center min-h-[320px] animate-fade-in">
                <div className="text-3xl font-bold mb-2">{modules.find(m => m.key === tab)?.label}</div>
                <div className="text-slate-600 mb-4">Feature coming soon...</div>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
