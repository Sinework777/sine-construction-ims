import React, { useState } from 'react';
import Sidebar from '../../components/admin/SidebarAdmin';
import Topbar from '../../components/admin/TopbarAdmin';
import OverviewWidget from '../../components/admin/widgets/OverviewWidget';
import KPIWidget from '../../components/admin/widgets/KPIWidget';
import AnalyticsWidget from '../../components/admin/widgets/AnalyticsWidget';
import GlobalSearch from '../../components/admin/widgets/GlobalSearch';
import NotificationsCenter from '../../components/admin/widgets/NotificationsCenter';
import ProjectManager from '../../components/admin/widgets/ProjectManager';
import ComplianceModule from '../../components/admin/widgets/ComplianceModule';
import SupportCenter from '../../components/admin/widgets/SupportCenter';
import APIManager from '../../components/admin/widgets/APIManager';
import SecurityDashboard from '../../components/admin/widgets/SecurityDashboard';
import AutomationCenter from '../../components/admin/widgets/AutomationCenter';
import SettingsModule from '../../components/admin/widgets/SettingsModule';
import ConIMSModule from '../../components/admin/widgets/ConIMSModule';
import UserApproval from '../../components/admin/UserApproval';
import ManageUsers from '../../components/admin/ManageUsers';
import EntitiesManagement from '../../components/admin/EntitiesManagement';
import { Box, CssBaseline } from '@mui/material';

const modules = [
  { key: 'overview', label: 'Overview', component: <><OverviewWidget /><KPIWidget /><div style={{marginTop:16, color:'#1976d2', fontWeight:600}}>KPIWidget is LIVE</div></> },
  { key: 'user-approval', label: 'User Approval', component: <UserApproval /> },
  { key: 'manage-users', label: 'Manage Users', component: <ManageUsers /> },
  { key: 'entities-management', label: 'Entities Management', component: <EntitiesManagement /> },
  { key: 'analytics', label: 'Analytics', component: <AnalyticsWidget /> },
  { key: 'search', label: 'Global Search', component: <GlobalSearch /> },
  { key: 'notifications', label: 'Notifications', component: <NotificationsCenter /> },
  { key: 'projects', label: 'Projects', component: <ProjectManager /> },
  { key: 'compliance', label: 'Compliance', component: <ComplianceModule /> },
  { key: 'support', label: 'Support', component: <SupportCenter /> },
  { key: 'api', label: 'API & Integrations', component: <APIManager /> },
  { key: 'security', label: 'Security', component: <SecurityDashboard /> },
  { key: 'automation', label: 'Automation', component: <AutomationCenter /> },
  { key: 'settings', label: 'Settings', component: <SettingsModule /> },
];

export default function SysAdminDashboardV2() {
  const [activeModule, setActiveModule] = useState('overview');
  const [collapsed, setCollapsed] = useState(false);
  const ActiveComponent = modules.find(m => m.key === activeModule)?.component || <OverviewWidget />;

  // Add more modules for full IMS management
  const extendedModules = [
    ...modules,
    { key: 'boq', label: 'BOQ', component: <div>BOQ Module Coming Soon</div> },
    // Deprecated modules removed from sidebar:
    // { key: 'materials', label: 'Material Logs', ... },
    // { key: 'dailyReports', label: 'Daily Reports', ... },
    // { key: 'meetingMinutes', label: 'Meeting Minutes', ... },
    // { key: 'documentControl', label: 'Document Control', ... },
    // { key: 'qaQc', label: 'QA/QC', ... },
    // { key: 'hse', label: 'HSE', ... },
    // { key: 'finance', label: 'Finance', ... },
    { key: 'auditLogs', label: 'Audit Logs', component: <div>Audit Logs Module Coming Soon</div> },
    { key: 'featureFlags', label: 'Feature Flags', component: <div>Feature Flags Module Coming Soon</div> },
    { key: 'licenses', label: 'Licenses', component: <div>Licenses Module Coming Soon</div> },
    { key: 'backups', label: 'Backups', component: <div>Backups Module Coming Soon</div> },
    { key: 'conims', label: 'Con IMS', component: <ConIMSModule />, link: '/sys-admin-dashboard/conims' },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#f7f9fb' }}>
      <CssBaseline />
      <Sidebar modules={extendedModules} active={activeModule} onSelect={setActiveModule} collapsed={collapsed} onToggle={() => setCollapsed(c => !c)} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <Box sx={{ flex: 1, p: 3, overflow: 'auto' }}>
          {ActiveComponent}
        </Box>
      </Box>
    </Box>
  );
}
