
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockSecurity = [
  { id: 1, event: 'Login', user: 'Alice Smith', status: 'Success', time: '2025-07-27 09:12' },
  { id: 2, event: 'Failed Login', user: 'Bob Lee', status: 'Failed', time: '2025-07-27 08:55' },
  { id: 3, event: 'Password Change', user: 'Carol Jones', status: 'Success', time: '2025-07-26 17:40' },
];

const columns = [
  { field: 'event', headerName: 'Event', flex: 1 },
  { field: 'user', headerName: 'User', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 0.7 },
  { field: 'time', headerName: 'Time', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: () => (
      <Button size="small" variant="outlined" color="primary">Details</Button>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function Security() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const filtered = mockSecurity.filter(e =>
    (!search || e.user.toLowerCase().includes(search.toLowerCase()) || e.event.toLowerCase().includes(search.toLowerCase())) &&
    (!status || e.status === status)
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Security</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Status" value={status} onChange={e => setStatus(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Success">Success</MenuItem>
            <MenuItem value="Failed">Failed</MenuItem>
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
