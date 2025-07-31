import React, { useEffect, useState } from 'react';
import { Paper, Typography, Grid, CircularProgress } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../config/firebase';

export default function KPIWidget() {
  const [stats, setStats] = useState({ projects: 0, users: 0, tickets: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchKPIs() {
      setLoading(true);
      setError(null);
      try {
        const projectsSnap = await getDocs(collection(db, 'projects'));
        const usersSnap = await getDocs(collection(db, 'users'));
        const ticketsSnap = await getDocs(collection(db, 'supportTickets'));
        setStats({
          projects: projectsSnap.size,
          users: usersSnap.size,
          tickets: ticketsSnap.size,
        });
      } catch {
        setError('Failed to load KPIs. Please check your connection or Firestore rules.');
      } finally {
        setLoading(false);
      }
    }
    fetchKPIs();
  }, []);

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" fontWeight={700} gutterBottom>
        Real-Time KPIs
      </Typography>
      {loading ? <CircularProgress /> : error ? (
        <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>
      ) : (stats.projects === 0 && stats.users === 0 && stats.tickets === 0) ? (
        <Typography color="text.secondary" sx={{ mt: 2 }}>No KPI data found. Add projects, users, or tickets to see stats.</Typography>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, bgcolor: '#e3f2fd' }}>
              <Typography variant="subtitle1">Active Projects</Typography>
              <Typography variant="h4">{stats.projects}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, bgcolor: '#e8f5e9' }}>
              <Typography variant="subtitle1">Total Users</Typography>
              <Typography variant="h4">{stats.users}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, bgcolor: '#fff3e0' }}>
              <Typography variant="subtitle1">Open Support Tickets</Typography>
              <Typography variant="h4">{stats.tickets}</Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
}
