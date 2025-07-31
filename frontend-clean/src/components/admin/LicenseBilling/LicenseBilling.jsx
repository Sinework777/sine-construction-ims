import React from 'react';
import { Box, Typography } from '@mui/material';

export default function LicenseBilling() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} mb={2}>License & Billing</Typography>
      <Typography variant="body1">Manage licenses, subscriptions, and billing for all tenants.</Typography>
    </Box>
  );
}
