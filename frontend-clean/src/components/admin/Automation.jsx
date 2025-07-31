
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockAutomation = [
  { id: 1, task: 'Nightly Backup', status: 'Active', lastRun: '2025-07-27 02:00' },
  { id: 2, task: 'User Sync', status: 'Inactive', lastRun: '2025-07-26 23:00' },
  { id: 3, task: 'Report Export', status: 'Active', lastRun: '2025-07-26 22:00' },
];

const columns = [
  { field: 'task', headerName: 'Task', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 0.7 },
  { field: 'lastRun', headerName: 'Last Run', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: () => (
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" color="primary">Run Now</Button>
        <Button size="small" variant="outlined" color="error">Disable</Button>
      </Stack>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function Automation() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const filtered = mockAutomation.filter(t =>
    (!search || t.task.toLowerCase().includes(search.toLowerCase())) &&
    (!status || t.status === status)
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Automation</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Status" value={status} onChange={e => setStatus(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          <Box flexGrow={1} />
          <Button variant="contained" color="primary">Add Task</Button>
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
