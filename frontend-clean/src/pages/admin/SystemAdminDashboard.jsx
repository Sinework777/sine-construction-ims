import React, { useState } from 'react';

console.log('SystemAdminDashboard mounted');
import { Box, CssBaseline, ThemeProvider, createTheme, Paper, Typography, Button, Grid, Tooltip, Divider } from '@mui/material';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminTopbar from '../../components/admin/AdminTopbar';
import AdminMainContent from '../../components/admin/AdminMainContent';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import { moduleIcons } from './SystemAdminIcons';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: { main: '#1976d2' },
          background: { default: '#f4f6fa', paper: '#fff' },
        }
      : {
          primary: { main: '#90caf9' },
          background: { default: '#121212', paper: '#1e1e1e' },
        }),
  },
});

export default function SystemAdminDashboard() {
  const [mode, setMode] = useState('light');
  const theme = createTheme(getDesignTokens(mode));
  const navigate = useNavigate();
  // Group modules for visual clarity
  const moduleGroups = [
    {
      group: 'User & Access',
      modules: [
        { label: 'Multi-Tenancy', key: 'multitenancy', desc: 'Manage tenants and organizations.' },
        { label: 'Global User Management', key: 'globalusers', desc: 'Manage all users across tenants.' },
        { label: 'Roles & Permissions', key: 'roles', desc: 'Configure roles and access.' },
      ],
    },
    {
      group: 'Platform & Security',
      modules: [
        { label: 'License & Billing', key: 'licensebilling', desc: 'Manage licenses and billing.' },
        { label: 'Audit Logging', key: 'auditlogging', desc: 'Track system activity.' },
        { label: 'Security & Compliance', key: 'securitycompliance', desc: 'Compliance and security settings.' },
        { label: 'System Settings', key: 'settings', desc: 'Platform configuration.' },
        { label: 'Backups & Recovery', key: 'backupsrecovery', desc: 'Data backup and recovery.' },
        { label: 'Support & Announcements', key: 'supportannouncements', desc: 'Support and announcements.' },
        { label: 'Platform Analytics', key: 'platformanalytics', desc: 'Analytics and reporting.' },
      ],
    },
    {
      group: 'Advanced Features',
      modules: [
        { label: 'API Keys', key: 'apikeys', desc: 'Manage API access.' },
        { label: 'Feature Flags', key: 'featureflags', desc: 'Toggle features.' },
        { label: 'Projects', key: 'projects', desc: 'Project management.' },
        { label: 'Monitoring', key: 'monitoring', desc: 'System monitoring.' },
        { label: 'Workflows', key: 'workflows', desc: 'Workflow approvals.' },
        { label: 'Support', key: 'support', desc: 'Helpdesk and support.' },
        { label: 'Data & Backup', key: 'data', desc: 'Data management.' },
        { label: 'Scheduled Tasks', key: 'tasks', desc: 'Automated tasks.' },
        { label: 'Licenses', key: 'licenses', desc: 'License management.' },
      ],
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <AdminSidebar mode={mode} setMode={setMode} />
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <AdminTopbar mode={mode} setMode={setMode} />
          <Box sx={{ p: { xs: 1, md: 4 }, bgcolor: 'background.default', minHeight: 'calc(100vh - 64px)' }}>
            <Paper sx={{ p: { xs: 2, md: 4 }, mb: 4, bgcolor: 'background.paper', boxShadow: 3, borderRadius: 4 }}>
              <Typography variant="h3" fontWeight={800} color="primary.main" gutterBottom align="center">
                Sine Cons IMS Master Dashboard
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom align="center">
                This is the enterprise-wide control panel for the entire Sine Construction IMS platform. Manage all modules from one place.
              </Typography>
              {moduleGroups.map((group, idx) => (
                <Box key={group.group} sx={{ mb: 4 }}>
                  <Typography variant="subtitle1" fontWeight={700} color="primary" sx={{ mb: 2, mt: idx === 0 ? 2 : 4, pl: 1 }}>
                    {group.group}
                  </Typography>
                  <Grid container spacing={3} justifyContent="center">
                    {group.modules.map((mod) => {
                      const Icon = moduleIcons[mod.key];
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={mod.key}>
                          <Tooltip title={mod.desc} arrow placement="top">
                            <Paper
                              sx={{
                                p: 3,
                                textAlign: 'center',
                                bgcolor: 'grey.100',
                                boxShadow: 2,
                                borderRadius: 3,
                                transition: 'box-shadow 0.2s, transform 0.2s',
                                '&:hover': {
                                  boxShadow: 8,
                                  transform: 'translateY(-4px) scale(1.03)',
                                  bgcolor: 'primary.50',
                                },
                                cursor: 'pointer',
                              }}
                              elevation={0}
                              onClick={() => navigate(`/admin/system/${mod.key}`)}
                            >
                              {Icon && <Icon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />}
                              <Typography variant="h6" fontWeight={700} mb={0.5} sx={{ mt: 1 }}>
                                {mod.label}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ minHeight: 32 }}>
                                {mod.desc}
                              </Typography>
                              <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                sx={{ mt: 2, borderRadius: 2, fontWeight: 700, px: 4 }}
                              >
                                Open
                              </Button>
                            </Paper>
                          </Tooltip>
                        </Grid>
                      );
                    })}
                  </Grid>
                  {idx < moduleGroups.length - 1 && <Divider sx={{ my: 4 }} />}
                </Box>
              ))}
            </Paper>
            <Routes>
              <Route path=":module" element={<AdminMainContent />} />
              <Route index element={<AdminMainContent />} />
            </Routes>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
