import React, { useState, useEffect } from 'react';
import {
  FaUserCircle, FaChevronDown, FaSyncAlt, FaUpload, FaExclamationCircle, FaSun, FaChartPie, FaCamera, FaClipboardList, FaQuestionCircle, FaFireExtinguisher, FaRegCalendarCheck, FaFileAlt, FaPlus, FaUsers, FaRegClock, FaRegEnvelopeOpen, FaCheckCircle
} from 'react-icons/fa';

const userRoles = {
  Admin: 'Welcome back, Admin!',
  QAQC: 'QA/QC Lead Dashboard',
  Client: 'Client Portal',
  Default: 'Welcome to IMS Dashboard',
};

const projects = ['Tower A', 'Tower B', 'Site C'];

const statCards = [
  { title: 'Open RFIs', value: 5, icon: <FaQuestionCircle />, color: 'bg-blue-100', text: 'text-blue-700' },
  { title: 'Pending Submittals', value: 3, icon: <FaUpload />, color: 'bg-indigo-100', text: 'text-indigo-700' },
  { title: 'Active NCRs', value: 2, icon: <FaExclamationCircle />, color: 'bg-red-100', text: 'text-red-700' },
  { title: 'Weather', value: 'Sunny 32°C', icon: <FaSun />, color: 'bg-yellow-100', text: 'text-yellow-700' },
  { title: 'Progress', value: '78%', icon: <FaChartPie />, color: 'bg-green-100', text: 'text-green-700' },
  { title: 'Site Photos', value: 42, icon: <FaCamera />, color: 'bg-pink-100', text: 'text-pink-700' },
  { title: 'HSE Alerts', value: 1, icon: <FaFireExtinguisher />, color: 'bg-orange-100', text: 'text-orange-700' },
  { title: 'Unread Minutes', value: 4, icon: <FaRegEnvelopeOpen />, color: 'bg-slate-100', text: 'text-slate-700' },
];

const quickActions = [
  { label: 'New Daily Report', icon: <FaClipboardList />, tooltip: 'Create a new daily report' },
  { label: 'Submit RFI', icon: <FaQuestionCircle />, tooltip: 'Submit a new RFI' },
  { label: 'Add Submittal', icon: <FaUpload />, tooltip: 'Add a new submittal' },
  { label: 'Log HSE Event', icon: <FaFireExtinguisher />, tooltip: 'Log a new HSE event' },
  { label: 'Upload Site Photo', icon: <FaCamera />, tooltip: 'Upload a site photo' },
  { label: 'Add Meeting Minute', icon: <FaFileAlt />, tooltip: 'Add meeting minutes' },
  { label: 'Add Progress Update', icon: <FaChartPie />, tooltip: 'Update project progress' },
  { label: 'Invite User', icon: <FaUsers />, tooltip: 'Invite a new user' },
];

const stats = {
  Admin: 'System metrics and user activity',
  'QA/QC Engineer': 'Pending NCRs and inspections',
  'HSE Officer': 'Latest safety incidents',
  'Project Manager': 'Daily reports summary and schedule status',
};

export default function DashboardHome({ user = { name: 'Admin User', role: 'User', project: 'Tower A', lastLogin: '', avatar: '' } }) {
  const [project, setProject] = useState(user.project || 'Tower A');
  const [now, setNow] = useState(new Date());
  const avatar = user.avatar || 'https://randomuser.me/api/portraits/men/32.jpg';

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const safeRole = typeof user.role === 'string' && user.role.trim() ? user.role : 'User';
  const greeting = userRoles[safeRole] || userRoles.Default;

  return (
    <div className="w-full max-w-7xl mx-auto py-8 px-4 sm:px-8">
      {/* Hero Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Welcome Panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-xl p-8 flex flex-col justify-between min-h-[320px]">
          <div className="flex items-center gap-4 mb-4">
            <img src={avatar} alt="Profile" className="w-16 h-16 rounded-full shadow-lg ring-2 ring-blue-300" />
            <div>
              <h2 className="text-2xl font-bold mb-1">{greeting}</h2>
              <div className="text-blue-700 font-semibold">{user.name}</div>
              <div className="text-slate-700">Role: {user.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <FaRegClock className="w-5 h-5 text-blue-500" />
            <span className="font-mono text-lg">{now.toLocaleTimeString()}</span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-semibold text-slate-700">Project:</span>
            <select value={project} onChange={e => setProject(e.target.value)} className="rounded-xl px-3 py-1 bg-slate-100 text-slate-700 font-semibold shadow ring-1 ring-slate-300">
              {projects.map(p => <option key={p}>{p}</option>)}
            </select>
            <FaChevronDown className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-xs text-slate-500 mt-2">Last login: {new Date(user.lastLogin).toLocaleString()}</div>
        </motion.div>
        {/* Stats Panel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statCards.map((card, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center transition ${card.color} ${card.text} cursor-pointer`}
              aria-label={card.title}
            >
              <span className="text-2xl mb-2">{card.icon}</span>
              <span className="font-bold text-lg mb-1">{card.title}</span>
              <span className="text-2xl font-extrabold">{card.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {quickActions.map((action, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.08 }}
            className="bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg ring-1 ring-blue-300 flex items-center gap-2 justify-center transition relative group"
            aria-label={action.label}
          >
            <span className="text-xl">{action.icon}</span> {action.label}
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded bg-slate-800 text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none">{action.tooltip}</span>
          </motion.button>
        ))}
      </div>
      {/* Role-based Stats */}
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-lg font-semibold">Role: {user.role}</h2>
            <p>{stats[user.role] || 'General overview'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
