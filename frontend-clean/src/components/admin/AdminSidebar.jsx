import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, IconButton, Toolbar, Box, Typography, Switch, Tooltip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SettingsIcon from '@mui/icons-material/Settings';
import BarChartIcon from '@mui/icons-material/BarChart';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import ScheduleIcon from '@mui/icons-material/Schedule';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ApiIcon from '@mui/icons-material/Api';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const drawerWidth = 260;

// Grouped navigation structure for enterprise sidebar
const navGroups = [
  {
    label: 'Core',
    items: [
      { label: 'Overview', icon: <DashboardIcon />, key: 'dashboard' },
      { label: 'User Approval', icon: <PeopleIcon />, key: 'user-approval' },
      { label: 'Manage Users', icon: <PeopleIcon />, key: 'manage-users' },
      { label: 'Entities Management', icon: <BusinessIcon />, key: 'entities' },
      { label: 'Projects', icon: <AssignmentIcon />, key: 'projects' },
    ],
  },
  {
    label: 'Insights',
    items: [
      { label: 'Analytics', icon: <BarChartIcon />, key: 'analytics' },
      { label: 'Global Search', icon: <SearchIcon />, key: 'search' },
      { label: 'Notifications', icon: <NotificationsIcon />, key: 'notifications' },
      { label: 'Compliance', icon: <SecurityIcon />, key: 'compliance' },
    ],
  },
  {
    label: 'Platform',
    items: [
      { label: 'Support', icon: <SupportAgentIcon />, key: 'support' },
      { label: 'API & Integrations', icon: <ApiIcon />, key: 'api' },
      { label: 'Security', icon: <SecurityIcon />, key: 'security' },
      { label: 'Automation', icon: <AutoAwesomeIcon />, key: 'automation' },
      { label: 'Settings', icon: <SettingsIcon />, key: 'settings' },
    ],
  },
];

function AdminSidebar() {
  const [open, setOpen] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // TODO: Integrate with global theme provider
  const handleThemeToggle = () => setDarkMode((prev) => !prev);

  // Helper to determine active route
  const isActive = (key) => {
    const path = location.pathname;
    if (key === 'dashboard') return path === '/admin/system/dashboard';
    if (key === 'manage-users') return path.includes('/admin/system/manage-users') || path.includes('/dashboard/admin/users');
    return path.includes(`/admin/system/${key}`) || path.includes(`/dashboard/admin/${key}`);
  };

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        width: open ? drawerWidth : 64,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: open ? drawerWidth : 64,
          boxSizing: 'border-box',
          bgcolor: darkMode ? '#181c24' : 'background.paper',
          color: darkMode ? '#fff' : 'inherit',
          borderRight: 0,
          transition: 'width 0.2s',
        },
      }}
    >
      <Toolbar sx={{ justifyContent: open ? 'space-between' : 'center', px: 1 }}>
        {open && (
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1, color: darkMode ? '#fff' : '#1a2233' }}>
            SINE consIMS
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
            <IconButton onClick={handleThemeToggle} size="small" sx={{ color: darkMode ? '#fff' : '#1a2233' }}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          <IconButton onClick={() => setOpen(!open)} size="small" sx={{ color: darkMode ? '#fff' : '#1a2233' }}>
            {open ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Toolbar>
      <Divider />
      {navGroups.map((group, idx) => (
        <Box key={group.label} sx={{ mb: 1 }}>
          {open && (
            <Typography variant="caption" sx={{ pl: 2, pt: idx === 0 ? 0 : 1, color: darkMode ? '#bbb' : '#888', fontWeight: 700, letterSpacing: 1 }}>
              {group.label}
            </Typography>
          )}
          <List>
            {group.items.map((item) => (
              <ListItem
                button
                key={item.key}
                sx={{
                  py: 1.5,
                  bgcolor: isActive(item.key) ? (darkMode ? '#26304a' : '#e3e8f0') : 'inherit',
                  color: isActive(item.key) ? (darkMode ? '#fff' : '#1a2233') : (darkMode ? '#bbb' : 'inherit'),
                  borderLeft: isActive(item.key) ? `4px solid #1976d2` : '4px solid transparent',
                  fontWeight: isActive(item.key) ? 700 : 400,
                  transition: 'all 0.15s',
                }}
                onClick={() => {
                  if (item.key === 'manage-users') {
                    navigate('/dashboard/admin/users');
                  } else if (item.key === 'dashboard') {
                    navigate('/dashboard/admin');
                  } else {
                    navigate(`/dashboard/admin/${item.key}`);
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 36, color: isActive(item.key) ? '#1976d2' : (darkMode ? '#fff' : '#1a2233') }}>{item.icon}</ListItemIcon>
                {open && <ListItemText primary={item.label} />}
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="caption" sx={{ color: darkMode ? '#bbb' : '#888' }}>
          SINE Construction IMS Admin
        </Typography>
      </Box>
    </Drawer>
  );
}

export default AdminSidebar;
