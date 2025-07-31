import React from 'react';
import { Paper, Typography } from '@mui/material';

export default function SecurityDashboard() {
  return (
    <Paper sx={{ p: 4, mb: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Security Dashboard & RBAC
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Monitor security, RBAC, audit logs, and data retention controls.
      </Typography>
      {/* TODO: Add security/rbac UI */}
    </Paper>
  );
}
