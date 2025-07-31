import React from 'react';
import { Box, Typography } from '@mui/material';

export default function GlobalUserManagement() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={2}>Global User Management</Typography>
      <Typography variant="body1">Manage all users across tenants, assign roles, and control access.</Typography>
    </Box>
  );
}
