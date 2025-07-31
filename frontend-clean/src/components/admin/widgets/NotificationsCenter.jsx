import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, ListItemIcon, CircularProgress, IconButton, Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getUserNotifications, markNotificationRead } from '../../../services/notificationService';

export default function NotificationsCenter({ userId = 'sysadmin' }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      const notifs = await getUserNotifications(userId);
      setNotifications(notifs.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
      setUnread(notifs.filter(n => !n.read).length);
      setLoading(false);
    }
    fetchNotifications();
  }, [userId]);

  const handleMarkRead = async (id) => {
    await markNotificationRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    setUnread(unread - 1);
  };

  return (
    <Paper sx={{ p: 4, mb: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        <Badge color="error" badgeContent={unread} max={99}>
          <NotificationsIcon sx={{ mr: 1 }} />
        </Badge>
        Notifications & Alerts
      </Typography>
      {loading ? <CircularProgress size={24} /> : (
        <List>
          {notifications.length === 0 ? (
            <ListItem><ListItemText primary="No notifications." /></ListItem>
          ) : notifications.map(n => (
            <ListItem key={n.id} selected={!n.read} secondaryAction={
              !n.read && <IconButton edge="end" onClick={() => handleMarkRead(n.id)} title="Mark as read"><NotificationsIcon color="primary" /></IconButton>
            }>
              <ListItemText primary={n.message} secondary={n.createdAt ? new Date(n.createdAt.seconds * 1000).toLocaleString() : ''} />
            </ListItem>
          ))}
        </List>
      )}
    </Paper>
  );
}
