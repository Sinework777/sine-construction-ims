import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FaBell,
  FaUserCircle,
  FaChevronLeft,
  FaChevronRight,
  FaSignOutAlt,
  FaCog,
  FaMoon,
  FaSun,
  FaProjectDiagram,
  FaCalendarAlt,
  FaClipboardList,
  FaTools,
  FaFireExtinguisher,
  FaUpload,
  FaQuestionCircle,
  FaChartBar,
  FaBoxOpen,
  FaFolderOpen,
  FaFileAlt,
  FaRegFileAlt,
  FaUsers,
  FaCamera,
  FaThumbtack,
  FaRegClock,
  FaUserCheck,
  FaWrench,
  FaCogs,
  FaRegCalendarCheck,
  FaRegListAlt,
  FaRegUser,
  FaPlus,
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHome from '../components/DashboardHome';
import DailyReportsPage from '../pages/shared/DailyReportsPage';
import QAQCReports from '../components/QAQCReports';
import HSEReports from '../components/HSEReports';
import Submittals from '../components/Submittals';
import RFIForm from '../components/RFIForm';
import BOQ from '../components/BOQ';
import QuantitySurvey from '../components/QuantitySurvey';
import MaterialLogs from '../components/MaterialLogs';
import Specifications from '../components/Specifications';
import DocumentControl from '../components/DocumentControl';
import MeetingMinutes from '../components/MeetingMinutes';
import Schedule from '../components/Schedule';

const modules = [
  { key: 'DashboardHome', label: 'Dashboard Home', icon: <FaProjectDiagram /> },
  // Daily Reports for each role
  { key: 'DailyReports', label: 'Daily Reports', icon: <FaClipboardList />,
    route: (userRole => {
      switch (userRole) {
        case 'pm': return '/dashboard/pm/daily-reports';
        case 'qaqc': return '/dashboard/qaqc/daily-reports';
        case 'superintendent': return '/dashboard/superintendent/daily-reports';
        case 'hse': return '/dashboard/hse/daily-reports';
        default: return null;
      }
    })
  },
  { key: 'QAQCReports', label: 'QA/QC Reports', icon: <FaTools /> },
  { key: 'HSEObservations', label: 'HSE Observations', icon: <FaFireExtinguisher /> },
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
  { key: 'UserManagement', label: 'User Management', icon: <FaUsers />, admin: true },
  { key: 'Settings', label: 'Settings', icon: <FaCog /> },
];

const featureCards = [
  { title: 'Open RFIs', value: 5, icon: <FaQuestionCircle className="text-blue-500" /> },
  { title: 'Pending Submittals', value: 3, icon: <FaUpload className="text-indigo-500" /> },
  { title: 'Active NCRs', value: 2, icon: <FaTools className="text-red-500" /> },
  { title: 'Weather', value: 'Sunny 32°C', icon: <FaSun className="text-yellow-400" /> },
];

const quickLinks = [
  { label: 'Daily Report', icon: <FaClipboardList />, tab: 'DailyReports' },
  { label: 'Submit RFI', icon: <FaQuestionCircle />, tab: 'RFIManagement' },
  { label: 'Add Submittal', icon: <FaUpload />, tab: 'Submittals' },
];


function getUser() {
  // Use sessionUser for role-based credentials
  return JSON.parse(localStorage.getItem('sessionUser')) || { name: 'Admin User', role: 'admin', project: 'Tower A' };
}

function getToken() {
  // Accept any sessionUser as logged in
  return localStorage.getItem('sessionUser') ? 'session-token' : null;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(getUser());
  const [tab, setTab] = useState('DashboardHome');
  const [now, setNow] = useState(new Date());
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);

  useEffect(() => {
    if (!getToken()) navigate('/login');
    const params = new URLSearchParams(location.search);
    const t = params.get('tab');
    if (t && modules.some(m => m.key === t)) setTab(t);
    else if (location.pathname === '/dashboard/pm/daily-reports') setTab('DailyReports');
    else setTab('DashboardHome');
  }, [location, navigate]);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function handleTabChange(key) {
    setTab(key);
    // Only update tab, do not navigate away
  }

  function handleLogout() {
    localStorage.removeItem('ims_token');
    localStorage.removeItem('ims_user');
    navigate('/login');
  }

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
          <select className="rounded-xl px-3 py-2 bg-slate-100 text-slate-700 font-semibold shadow ring-1 ring-slate-300">
            <option>{user.project}</option>
            <option>Tower B</option>
            <option>Site C</option>
          </select>
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
              <span className="font-semibold">{user.name}</span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl ring-1 ring-slate-200 z-40 p-4 animate-fade-in">
                <div className="font-bold mb-2">{user.name}</div>
                <div className="text-sm text-slate-600 mb-2">Role: {user.role}</div>
                <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-100 transition">My Account</button>
                <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-100 transition">Preferences</button>
                <button className="w-full text-left px-2 py-2 rounded hover:bg-slate-100 transition" onClick={handleLogout}><FaSignOutAlt className="inline mr-2" />Logout</button>
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
            {modules.map(m => {
              // Only show Daily Reports for allowed roles
              if (m.key === 'DailyReports' && !['pm','qaqc','superintendent','hse'].includes(user.role.toLowerCase())) return null;
              if (m.admin && user.role.toLowerCase() !== 'admin') return null;
              return (
                <button
                  key={m.key}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-blue-100 hover:scale-105 ${tab === m.key ? 'bg-blue-700 text-white scale-105 shadow-xl' : 'text-slate-700'} ${!sidebarOpen ? 'justify-center px-2' : ''}`}
                  onClick={() => {
                    setTab(m.key);
                    // If module has a route, navigate to it
                    if (m.key === 'DailyReports') {
                      const route = m.route(user.role.toLowerCase());
                      if (route) navigate(route);
                    } else if (m.route) {
                      navigate(m.route);
                    }
                  }}
                  title={sidebarOpen ? '' : m.label}
                >
                  <span className="text-xl">{m.icon}</span>
                  {sidebarOpen && <span className="ml-2 text-base">{m.label}</span>}
                </button>
              );
            })}
          </nav>
          {/* Quick Actions Button for PM Dashboard */}
          {user.role.toLowerCase() === 'pm' && (
            <div className="p-4">
              <button
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition"
                onClick={() => setFabOpen(o => !o)}
              >
                <FaPlus /> Quick Actions
              </button>
              {fabOpen && (
                <div className="mt-3 flex flex-col gap-2 bg-white/90 rounded-2xl shadow-xl p-4 ring-1 ring-blue-200 z-50">
                  {modules.filter(m => !m.admin).map(m => (
                    <button
                      key={m.key}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition"
                      onClick={() => {
                        setTab(m.key);
                        if (m.route) navigate(m.route);
                        setFabOpen(false);
                      }}
                    >
                      {m.icon} {m.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
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
              {tab === 'DashboardHome' && <DashboardHome user={user} />}
              {tab === 'DailyReports' && <DailyReportsPage />}
              {tab === 'QAQCReports' && <QAQCReports />}
              {tab === 'HSEObservations' && <HSEReports />}
              {tab === 'Submittals' && <Submittals />}
              {tab === 'RFIManagement' && <RFIForm />}
              {tab === 'BOQQuantitySurvey' && <><BOQ /><QuantitySurvey /></>}
              {tab === 'MaterialLogs' && <MaterialLogs />}
              {tab === 'Specifications' && <Specifications />}
              {tab === 'DocumentControl' && <DocumentControl />}
              {tab === 'MeetingMinutes' && <MeetingMinutes />}
              {tab === 'ProgressSchedule' && <Schedule />}
              {/* Placeholder for other modules */}
              {tab !== 'DashboardHome' && (
                <div className="bg-white/80 rounded-2xl shadow-xl ring-1 ring-blue-200 p-8 flex flex-col items-center justify-center min-h-[320px] animate-fade-in">
                  <div className="text-3xl font-bold mb-2">{modules.find(m => m.key === tab)?.label}</div>
                  <div className="text-slate-600 mb-4">Feature coming soon...</div>
                  <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-xl shadow hover:bg-blue-700 transition" onClick={() => handleTabChange('DashboardHome')}>Back to Home</button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          {/* Floating Action Button */}
          <div className="fixed bottom-8 right-8 z-50">
            <div className="relative">
              <button className="bg-blue-700 text-white rounded-full shadow-xl p-5 hover:scale-110 transition flex items-center justify-center" onClick={() => setFabOpen(o => !o)}>
                <FaPlus className="w-6 h-6" />
              </button>
              {fabOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute bottom-16 right-0 flex flex-col gap-3 bg-white/90 rounded-2xl shadow-xl p-4 ring-1 ring-blue-200"
                >
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition" onClick={() => handleTabChange('DailyReports')}><FaClipboardList /> + Daily Report</button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition" onClick={() => handleTabChange('RFIManagement')}><FaQuestionCircle /> + RFI</button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition" onClick={() => handleTabChange('Submittals')}><FaUpload /> + Submittal</button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition" onClick={() => handleTabChange('HSEObservations')}><FaFireExtinguisher /> + HSE Log</button>
                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition" onClick={() => handleTabChange('DocumentControl')}><FaFolderOpen /> + Upload Document</button>
                </motion.div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
