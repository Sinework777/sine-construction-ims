
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockNotifications = [
  { id: 1, type: 'System', message: 'System update scheduled', status: 'Unread', date: '2025-07-27' },
  { id: 2, type: 'Approval', message: 'User request pending', status: 'Read', date: '2025-07-26' },
  { id: 3, type: 'Info', message: 'New feature released', status: 'Unread', date: '2025-07-25' },
];

const columns = [
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'message', headerName: 'Message', flex: 2 },
  { field: 'status', headerName: 'Status', flex: 0.7 },
  { field: 'date', headerName: 'Date', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: () => (
      <Button size="small" variant="outlined" color="primary">Mark as Read</Button>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function Notifications() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const filtered = mockNotifications.filter(n =>
    (!search || n.message.toLowerCase().includes(search.toLowerCase())) &&
    (!type || n.type === type)
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Notifications</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Type" value={type} onChange={e => setType(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="System">System</MenuItem>
            <MenuItem value="Approval">Approval</MenuItem>
            <MenuItem value="Info">Info</MenuItem>
            <MenuItem value="Error">Error</MenuItem>
          </TextField>
          <Box flexGrow={1} />
        </Stack>
        <Box sx={{ height: 350, width: '100%' }}>
          <DataGrid
            rows={filtered}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10]}
            disableSelectionOnClick
            autoHeight
          />
        </Box>
      </CardContent>
    </Card>
  );
}
