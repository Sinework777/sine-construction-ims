import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, Badge, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Person from '@mui/icons-material/Person';
import Help from '@mui/icons-material/HelpOutline';
import History from '@mui/icons-material/History';

export default function Topbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace('/login');
  };
  return (
    <AppBar position="static" elevation={0} sx={{ background: '#fff', color: '#1a2233', borderBottom: '1px solid #e0e6ed' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          IMS Super Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleMenu} size="large" aria-label="user menu" sx={{ ml: 1 }}>
            <Avatar sx={{ bgcolor: '#1a2233', color: '#fff' }}>SA</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            PaperProps={{
              elevation: 3,
              sx: { mt: 1.5, minWidth: 200 },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem>
              <ListItemIcon><Person fontSize="small" /></ListItemIcon>
              Profile
            </MenuItem>
            <MenuItem>
              <ListItemIcon><Settings fontSize="small" /></ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem>
              <ListItemIcon><History fontSize="small" /></ListItemIcon>
              Activity Log
            </MenuItem>
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
        </Box>
      </Toolbar>
    </AppBar>
  );
}
