import React from 'react';
import { Paper, Typography } from '@mui/material';

export default function SupportCenter() {
  return (
    <Paper sx={{ p: 4, mb: 3 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Support Ticketing & Knowledge Base
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage support tickets, FAQs, and user feedback.
      </Typography>
      {/* TODO: Add support/knowledge base UI */}
    </Paper>
  );
}
