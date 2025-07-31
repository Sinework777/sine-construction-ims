import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, IconButton, Tooltip, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import SupportIcon from '@mui/icons-material/Support';
import ExtensionIcon from '@mui/icons-material/Extension';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ApiIcon from '@mui/icons-material/Api';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';

const iconMap = {
  overview: <DashboardIcon />,
  'user-approval': <GroupAddIcon />,
  analytics: <BarChartIcon />,
  search: <SearchIcon />,
  notifications: <NotificationsIcon />,
  projects: <BusinessIcon />,
  compliance: <SecurityIcon />,
  support: <SupportIcon />,
  api: <ApiIcon />,
  security: <SecurityIcon />,
  automation: <AutoAwesomeIcon />,
  settings: <SettingsIcon />,
  // Removed deprecated modules from iconMap
};

export default function Sidebar({ modules, active, onSelect, collapsed, onToggle }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 64 : 260,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: collapsed ? 64 : 260,
          boxSizing: 'border-box',
          background: '#1a2233',
          color: '#fff',
          transition: 'width 0.2s',
        },
      }}
    >
      <Toolbar sx={{ justifyContent: collapsed ? 'center' : 'flex-end', px: 1 }}>
        <IconButton onClick={onToggle} sx={{ color: '#fff' }} size="small">
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Toolbar>
      <List>
        {modules.map((mod) => (
          <Tooltip key={mod.key} title={mod.label} placement="right" disableHoverListener={!collapsed} arrow>
            {mod.link ? (
              <ListItem
                button
                component={Link}
                to={mod.link}
                selected={active === mod.key}
                sx={{ justifyContent: collapsed ? 'center' : 'flex-start', px: collapsed ? 1 : 2 }}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: 'center' }}>{iconMap[mod.key] || <ExtensionIcon />}</ListItemIcon>
                {!collapsed && <ListItemText primary={mod.label} />}
              </ListItem>
            ) : (
              <ListItem
                button
                selected={active === mod.key}
                onClick={() => onSelect(mod.key)}
                sx={{ justifyContent: collapsed ? 'center' : 'flex-start', px: collapsed ? 1 : 2 }}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: 'center' }}>{iconMap[mod.key] || <ExtensionIcon />}</ListItemIcon>
                {!collapsed && <ListItemText primary={mod.label} />}
              </ListItem>
            )}
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
}
