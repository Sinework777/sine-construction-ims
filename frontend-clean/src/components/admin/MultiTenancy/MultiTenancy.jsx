import React from 'react';
import { Box, Typography } from '@mui/material';

export default function MultiTenancy() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={2}>Multi-Tenancy Management</Typography>
      <Typography variant="body1">Manage tenants, organizations, and isolation policies here.</Typography>
    </Box>
  );
}
