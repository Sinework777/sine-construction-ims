import React from 'react';
import { Box, Typography } from '@mui/material';

export default function AuditLogging() {
  return (
    <Box className="bg-white rounded-xl shadow p-6 mb-8">
      <Typography variant="h4" fontWeight={700} mb={2}>Audit Logging</Typography>
      <ul className="list-disc ml-6 text-gray-700 mb-2">
        <li>Streams: Real-time log streams from all modules</li>
        <li>Filters: Advanced filtering by user, action, module, date</li>
        <li>Export: Download logs as CSV/JSON</li>
        <li>Alerts: Set up alerts for critical actions</li>
      </ul>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        All admin actions are logged and auditable. Data is stored in Firestore collection <code>auditLogs</code>.
      </Typography>
    </Box>
  );
}
