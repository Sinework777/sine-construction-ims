import React from 'react';
import { Paper, Typography } from '@mui/material';

export default function APIManager() {
  return (
    <Paper sx={{ p: 4, mb: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        API Management & Integrations
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage API keys, integrations, and marketplace modules.
      </Typography>
      {/* TODO: Add API/integrations UI */}
    </Paper>
  );
}
