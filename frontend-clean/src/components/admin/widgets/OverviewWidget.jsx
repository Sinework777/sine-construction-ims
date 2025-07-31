import React from 'react';
import { Paper, Typography } from '@mui/material';
import KPIWidget from './KPIWidget';

export default function OverviewWidget() {
  return (
    <>
      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Welcome, Super Admin
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is your new world-class IMS Super Admin dashboard. Use the sidebar to access advanced modules, analytics, automations, and more.
        </Typography>
      </Paper>
      <KPIWidget />
    </>
  );
}
