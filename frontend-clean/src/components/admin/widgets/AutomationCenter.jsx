import React, { useState } from 'react';
import { useRBAC } from '../../../context/RBACContext';
import { Paper, Typography, IconButton, Menu, MenuItem, Avatar, Divider, ListItemIcon } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import Help from '@mui/icons-material/HelpOutline';
import History from '@mui/icons-material/History';

export default function AutomationCenter() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/login');
  };
  const { rbac } = useRBAC();
  // Only show settings/activity if user has permission
  const canManageAutomation = rbac?.role === 'superadmin' || rbac?.permissions?.includes('manage_automation');

  // Demo stats (replace with real data as needed)
  const stats = [
    { label: 'Automations', value: 12, icon: <Settings color="primary" /> },
    { label: 'AI Insights', value: 5, icon: <Person color="secondary" /> },
    { label: 'Scheduled Tasks', value: 8, icon: <History color="action" /> },
  ];

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, mb: 3, borderRadius: 4, boxShadow: 6, position: 'relative', overflow: 'visible', background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)' }}>
      {/* User menu */}
      <div style={{ position: 'absolute', top: -36, right: 0, display: 'flex', alignItems: 'center', gap: 10, zIndex: 10 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'primary.main', letterSpacing: 1 }}>User</Typography>
        <IconButton
          onClick={handleMenu}
          size="large"
          aria-label="user menu"
          sx={{ bgcolor: 'primary.light', '&:hover': { bgcolor: 'primary.main', color: '#fff' }, boxShadow: 2 }}
          title="Open user menu"
        >
          <Avatar sx={{ bgcolor: 'primary.main', width: 40, height: 40 }}><Person /></Avatar>
        </IconButton>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 3,
          sx: { mt: 1.5, minWidth: 220 },
        }}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem>
          <ListItemIcon><Person fontSize="small" /></ListItemIcon>
          Profile
        </MenuItem>
        {canManageAutomation && (
          <MenuItem>
            <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
            Settings
          </MenuItem>
        )}
        {canManageAutomation && (
          <MenuItem>
            <ListItemIcon><History fontSize="small" /></ListItemIcon>
            Activity Log
          </MenuItem>
        )}
        <MenuItem>
          <ListItemIcon><Help fontSize="small" /></ListItemIcon>
          Help Center
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <ListItemIcon><Logout fontSize="small" color="error" /></ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Title & subtitle */}
      <Typography variant="h4" fontWeight={800} gutterBottom sx={{ letterSpacing: 1, color: 'primary.dark', mb: 1 }}>
        Automation & AI Center
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Automate reports, get AI insights, and schedule predictive analytics for your projects.
      </Typography>

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 32 }}>
        {stats.map((stat) => (
          <Paper key={stat.label} elevation={2} sx={{ px: 3, py: 2, minWidth: 140, display: 'flex', alignItems: 'center', gap: 2, borderRadius: 2, bgcolor: '#fff', boxShadow: 2 }}>
            {stat.icon}
            <div>
              <Typography variant="h6" fontWeight={700}>{stat.value}</Typography>
              <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
            </div>
          </Paper>
        ))}
      </div>

      {/* Quick actions */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        <Paper elevation={1} sx={{ px: 3, py: 2, borderRadius: 2, bgcolor: 'primary.light', color: 'primary.dark', cursor: 'pointer', '&:hover': { bgcolor: 'primary.main', color: '#fff' }, minWidth: 180 }}>
          <Typography variant="subtitle1" fontWeight={600}>Run Automation</Typography>
          <Typography variant="caption">Trigger a workflow</Typography>
        </Paper>
        <Paper elevation={1} sx={{ px: 3, py: 2, borderRadius: 2, bgcolor: 'secondary.light', color: 'secondary.dark', cursor: 'pointer', '&:hover': { bgcolor: 'secondary.main', color: '#fff' }, minWidth: 180 }}>
          <Typography variant="subtitle1" fontWeight={600}>Get AI Insight</Typography>
          <Typography variant="caption">Analyze project data</Typography>
        </Paper>
        <Paper elevation={1} sx={{ px: 3, py: 2, borderRadius: 2, bgcolor: 'success.light', color: 'success.dark', cursor: 'pointer', '&:hover': { bgcolor: 'success.main', color: '#fff' }, minWidth: 180 }}>
          <Typography variant="subtitle1" fontWeight={600}>Schedule Task</Typography>
          <Typography variant="caption">Set up automation</Typography>
        </Paper>
      </div>

      {/* Upcoming flows placeholder */}
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: '#f3f4f6', border: '1px dashed #c7d2fe', textAlign: 'center' }}>
        <Typography variant="subtitle1" fontWeight={700} color="primary.main" gutterBottom>
          Coming Soon: Visual Automation Builder
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Drag and drop to create custom automation flows, integrate AI, and monitor activity in real time.
        </Typography>
      </Paper>
    </Paper>
  );
}
