import React from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
// --- Credential seeding and debug logging ---
function seedRoleCredentials() {
  const roles = [
    'Admin','Project Manager','QA/QC Engineer','HSE Officer','Document Controller','Cost Engineer','Procurement Engineer','Scheduler / Planner','Site Supervisor','Design Engineer','Architect','Mechanical Engineer','Electrical Engineer','Client / Owner'
  ];
  const getRolePath = role => {
    const map = {
      'Admin': 'admin',
      'Project Manager': 'pm',
      'QA/QC Engineer': 'qaqc',
      'HSE Officer': 'hse',
      'Document Controller': 'docs',
      'Cost Engineer': 'finance',
      'Procurement Engineer': 'procurement',
      'Scheduler / Planner': 'schedule',
      'Site Supervisor': 'site',
      'Design Engineer': 'design',
      'Architect': 'architect',
      'Mechanical Engineer': 'mechanical',
      'Electrical Engineer': 'electrical',
      'Client / Owner': 'client-view',
    };
    return map[role] || role.replace(/\s+/g, '').toLowerCase();
  };
  const roleEmails = {
    'Admin': 'admin@consims.com',
    'Project Manager': 'pm@consims.com',
    'QA/QC Engineer': 'qaqc@consims.com',
    'HSE Officer': 'hse@consims.com',
    'Document Controller': 'docs@consims.com',
    'Cost Engineer': 'finance@consims.com',
    'Procurement Engineer': 'procurement@consims.com',
    'Scheduler / Planner': 'schedule@consims.com',
    'Site Supervisor': 'site@consims.com',
    'Design Engineer': 'design@consims.com',
    'Architect': 'architect@consims.com',
    'Mechanical Engineer': 'mechanical@consims.com',
    'Electrical Engineer': 'electrical@consims.com',
    'Client / Owner': 'client@consims.com',
  };
  roles.forEach(role => {
    const rolePath = getRolePath(role);
    const userObj = {
      fullName: role,
      email: roleEmails[role],
      phone: '',
      company: 'ConsIMS',
      password: 'password123',
      role,
      industry: '',
      country: '',
      agree: true,
      inviteCode: '',
    };
    localStorage.setItem(`signupData_${rolePath}`, JSON.stringify(userObj));
    localStorage.setItem(`sessionUser_${rolePath}`, JSON.stringify({
      name: role,
      email: roleEmails[role],
      role: rolePath,
      token: Math.random().toString(36).substr(2),
    }));
  });
  // Debug: Log all seeded credentials to console
  const rolePaths = [
    'admin','pm','qaqc','hse','docs','finance','procurement','schedule','site','design','architect','mechanical','electrical','client-view'
  ];
  rolePaths.forEach(rolePath => {
    const cred = localStorage.getItem(`signupData_${rolePath}`);
    if (cred) {
      console.log(`Seeded credential for ${rolePath}:`, JSON.parse(cred));
    } else {
      console.warn(`No credential found for ${rolePath}`);
    }
  });
}
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import LandingPage from './LandingPage';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';
import DashboardLayout from './components/DashboardLayout';
import DashboardPM from './pages/DashboardPM';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardQAQC from './pages/DashboardQAQC';
import HSEDashboard from './modules/hse/HSEDashboard.jsx';
import DashboardDocs from './pages/DashboardDocs';
import DashboardCost from './pages/DashboardCost';
import DashboardClient from './pages/DashboardClient';
import DashboardSchedule from './pages/DashboardSchedule';
import DashboardSite from './pages/DashboardSite';
import PendingApproval from './pages/PendingApproval';
import AdminUsers from './pages/AdminUsers.jsx';
import AdminSettings from './pages/AdminSettings.jsx';
import AdminModules from './pages/AdminModules.jsx';
import AdminApprovals from './pages/AdminApprovals.jsx';
import AdminAuditLog from './pages/AdminAuditLog.jsx';
import AdminProjects from './pages/AdminProjects.jsx';
import DailyReportsPage from './pages/shared/DailyReportsPage';
import Signup from './components/Signup';
import QAQCPage from './pages/shared/QAQCPage';
import { DailyReportsProvider } from './components/shared/DailyReports/DailyReportsContext.jsx';

function PrivateRoute({ children }) {
  // Use localStorage for authentication
  const isLoggedIn = !!localStorage.getItem('sessionUser');
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  React.useEffect(() => {
    seedRoleCredentials();
  }, []);
  return (
    <AuthProvider>
      <DailyReportsProvider>
        <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* Direct route for PM Daily Reports */}
          <Route path="/dashboard/pm/daily-reports" element={
            <PrivateRoute>
              <DailyReportsPage userRole="pm" project={JSON.parse(localStorage.getItem('sessionUser'))?.project} />
            </PrivateRoute>
          } />
          {/* Direct route for QAQC Daily Reports */}
          <Route path="/dashboard/qaqc/daily-reports" element={
            <PrivateRoute>
              <DailyReportsPage userRole="qaqc" project={JSON.parse(localStorage.getItem('sessionUser'))?.project} />
            </PrivateRoute>
          } />
          {/* Direct route for Superintendent Daily Reports */}
          <Route path="/dashboard/superintendent/daily-reports" element={
            <PrivateRoute>
              <DailyReportsPage userRole="superintendent" project={JSON.parse(localStorage.getItem('sessionUser'))?.project} />
            </PrivateRoute>
          } />
          {/* Direct route for HSE Daily Reports */}
          <Route path="/dashboard/hse/daily-reports" element={
            <PrivateRoute>
              <DailyReportsPage userRole="hse" project={JSON.parse(localStorage.getItem('sessionUser'))?.project} />
            </PrivateRoute>
          } />
          <Route path="/dashboard/:role/*" element={
            <PrivateRoute>
              <DashboardLayout />
            </PrivateRoute>
          }>
            {/* Route index to correct dashboard by role */}
            <Route index element={<RoleDashboardRouter />} />
            {/* Admin submodules */}
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="modules" element={<AdminModules />} />
            <Route path="approvals" element={<AdminApprovals />} />
            <Route path="audit-log" element={<AdminAuditLog />} />
            <Route path="projects" element={<AdminProjects />} />
            {/* Other role dashboards (for direct navigation) */}
            <Route path="pm" element={<DashboardPM />} />
            <Route path="qaqc" element={<DashboardQAQC />} />
            <Route path="hse" element={<HSEDashboard />} />
            <Route path="docs" element={<DashboardDocs />} />
            <Route path="finance" element={<DashboardCost />} />
            <Route path="client-view" element={<DashboardClient />} />
            <Route path="schedule" element={<DashboardSchedule />} />
            <Route path="site" element={<DashboardSite />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
          {/* Add /pending-approval as a top-level route */}
          <Route path="/pending-approval" element={<PendingApproval />} />
          {/* Redirect from /dashboard/pm/qaqc to /dashboard/qaqc/ncrs */}
          <Route path="/dashboard/pm/qaqc" element={<Navigate to="/dashboard/qaqc/ncrs" />} />
          {/* QA/QC submodule routes */}
          <Route path="/dashboard/qaqc/ncrs" element={<QAQCPage activeTab="ncrs" />} />
          <Route path="/dashboard/qaqc/checklists" element={<QAQCPage activeTab="checklists" />} />
          <Route path="/dashboard/qaqc/inspections" element={<QAQCPage activeTab="inspections" />} />
          <Route path="/dashboard/qaqc/approvals" element={<QAQCPage activeTab="approvals" />} />
          <Route path="/dashboard/qaqc/summary" element={<QAQCPage activeTab="summary" />} />
        </Routes>
      </Router>
    </DailyReportsProvider>
    </AuthProvider>
  );
}

import { useParams } from 'react-router-dom';

function RoleDashboardRouter() {
  const { role } = useParams();
  switch ((role || '').toLowerCase()) {
    case 'admin':
      return <DashboardAdmin />;
    case 'pm':
      return <DashboardPM />;
    case 'qaqc':
      return <DashboardQAQC />;
    case 'hse':
      return <HSEDashboard />;
    case 'docs':
      return <DashboardDocs />;
    case 'finance':
      return <DashboardCost />;
    case 'client-view':
      return <DashboardClient />;
    case 'schedule':
      return <DashboardSchedule />;
    case 'site':
      return <DashboardSite />;
    default:
      return <DashboardAdmin />;
  }
}

export default App;
