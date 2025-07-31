import React from 'react';
import { Paper, Typography } from '@mui/material';

export default function SettingsModule() {
  return (
    <Paper sx={{ p: 4, mb: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Platform Settings
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Configure platform-wide settings, preferences, and data retention.
      </Typography>
      {/* TODO: Add settings UI */}
    </Paper>
  );
}
