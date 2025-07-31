
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockAPIs = [
  { id: 1, name: 'Main API Key', type: 'API Key', status: 'Active', created: '2025-07-20' },
  { id: 2, name: 'Webhook: Slack', type: 'Webhook', status: 'Active', created: '2025-07-18' },
  { id: 3, name: 'Integration: Zapier', type: 'Integration', status: 'Inactive', created: '2025-07-15' },
];

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 0.7 },
  { field: 'created', headerName: 'Created', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: () => (
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" color="primary">Edit</Button>
        <Button size="small" variant="outlined" color="error">Delete</Button>
      </Stack>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function APIIntegrations() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const filtered = mockAPIs.filter(a =>
    (!search || a.name.toLowerCase().includes(search.toLowerCase())) &&
    (!type || a.type === type)
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>API & Integrations</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Type" value={type} onChange={e => setType(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="API Key">API Key</MenuItem>
            <MenuItem value="Webhook">Webhook</MenuItem>
            <MenuItem value="Integration">Integration</MenuItem>
          </TextField>
          <Box flexGrow={1} />
          <Button variant="contained" color="primary">Add</Button>
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
