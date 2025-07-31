import React from 'react';
import { Paper, Typography } from '@mui/material';

export default function ProjectManager() {
  return (
    <Paper sx={{ p: 4, mb: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Project & Resource Management
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage all projects, resources, and assignments from a single interface.
      </Typography>
      {/* TODO: Add project/resource management UI */}
    </Paper>
  );
}
