
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockTickets = [
  { id: 1, subject: 'Login Issue', status: 'Open', assignedTo: 'Support Team', created: '2025-07-27' },
  { id: 2, subject: 'Feature Request', status: 'Closed', assignedTo: 'Dev Team', created: '2025-07-26' },
  { id: 3, subject: 'Bug Report', status: 'Open', assignedTo: 'QA Team', created: '2025-07-25' },
];

const columns = [
  { field: 'subject', headerName: 'Subject', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 0.7 },
  { field: 'assignedTo', headerName: 'Assigned To', flex: 1 },
  { field: 'created', headerName: 'Created', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: () => (
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" color="primary">Assign</Button>
        <Button size="small" variant="contained" color="success">Resolve</Button>
      </Stack>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function SupportLanding() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const filtered = mockTickets.filter(t =>
    (!search || t.subject.toLowerCase().includes(search.toLowerCase())) &&
    (!status || t.status === status)
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Support</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Status" value={status} onChange={e => setStatus(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="Closed">Closed</MenuItem>
          </TextField>
          <Box flexGrow={1} />
          <Button variant="contained" color="primary">New Ticket</Button>
        </Stack>
        <Box sx={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={filtered}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            disableSelectionOnClick
            autoHeight
          />
        </Box>
      </CardContent>
    </Card>
  );
}
