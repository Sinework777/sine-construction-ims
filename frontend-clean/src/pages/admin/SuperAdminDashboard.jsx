import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Tabs, Tab, Paper } from '@mui/material';
import UserRoleManagement from '../../components/superadmin/UserRoleManagement';
import SystemConfig from '../../components/superadmin/SystemConfig';
import SecurityCompliance from '../../components/superadmin/SecurityCompliance';
import PlatformMonitoring from '../../components/superadmin/PlatformMonitoring';
import DataManagement from '../../components/superadmin/DataManagement';
import LicenseManagement from '../../components/superadmin/LicenseManagement';
import NotificationManagement from '../../components/superadmin/NotificationManagement';
import AuditReporting from '../../components/superadmin/AuditReporting';
import AdvancedFeatures from '../../components/superadmin/AdvancedFeatures';

const modules = [
  { label: 'User & Role Management', component: <UserRoleManagement /> },
  { label: 'System Configuration', component: <SystemConfig /> },
  { label: 'Security & Compliance', component: <SecurityCompliance /> },
  { label: 'Platform Monitoring', component: <PlatformMonitoring /> },
  { label: 'Data Management', component: <DataManagement /> },
  { label: 'License & Subscription', component: <LicenseManagement /> },
  { label: 'Notification & Communication', component: <NotificationManagement /> },
  { label: 'Audit & Reporting', component: <AuditReporting /> },
  { label: 'Advanced Features', component: <AdvancedFeatures /> },
];

export default function SuperAdminDashboard() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    // Check session for superadmin email
    const sessionUser = JSON.parse(localStorage.getItem('ims_user') || sessionStorage.getItem('ims_user') || 'null');
    if (!sessionUser || sessionUser.email !== 'superadmin@sineims.com') {
      setAccessDenied(true);
    } else {
      setEmail(sessionUser.email);
    }
  }, []);

  if (accessDenied) {
    return (
      <Box sx={{ p: 8, textAlign: 'center' }}>
        <Typography variant="h3" color="error" gutterBottom>Access Denied</Typography>
        <Typography variant="body1">Only <b>superadmin@sineims.com</b> can access the Super Admin Dashboard.</Typography>
        <Button variant="contained" color="primary" sx={{ mt: 4 }} onClick={() => navigate('/login')}>Go to Login</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h2" fontWeight={700} gutterBottom>Super Admin Dashboard</Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Welcome, {email}. You have full control over the Sine IMS platform.
      </Typography>
      <Button variant="outlined" color="secondary" sx={{ float: 'right', mb: 2 }} onClick={() => { localStorage.removeItem('ims_user'); sessionStorage.removeItem('ims_user'); navigate('/login'); }}>Logout</Button>
      <Paper sx={{ mt: 4 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
          {modules.map((mod) => <Tab key={mod.label} label={mod.label} />)}
        </Tabs>
        <Box sx={{ p: 4 }}>
          {modules[tab].component}
        </Box>
      </Paper>
    </Box>
  );
}
