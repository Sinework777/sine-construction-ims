
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockEntities = [
  { id: 1, name: 'Sine Construction', type: 'Company', status: 'Active', projects: 3 },
  { id: 2, name: 'HQ Tower', type: 'Project', status: 'Active', projects: 0 },
  { id: 3, name: 'Bridge Project', type: 'Project', status: 'Inactive', projects: 0 },
];

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'type', headerName: 'Type', flex: 0.8 },
  { field: 'status', headerName: 'Status', flex: 0.7 },
  { field: 'projects', headerName: 'Projects', flex: 0.7 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: () => (
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" color="primary">Edit</Button>
        <Button size="small" variant="outlined" color="error">Delete</Button>
        <Button size="small" variant="contained" color="success">Assign</Button>
      </Stack>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function EntitiesManagementLanding() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [status, setStatus] = useState('');

  const filtered = mockEntities.filter(e =>
    (!search || e.name.toLowerCase().includes(search.toLowerCase())) &&
    (!type || e.type === type) &&
    (!status || e.status === status)
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Entities Management</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Type" value={type} onChange={e => setType(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Company">Company</MenuItem>
            <MenuItem value="Project">Project</MenuItem>
          </TextField>
          <TextField label="Status" value={status} onChange={e => setStatus(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          <Box flexGrow={1} />
          <Button variant="contained" color="primary">Add Entity</Button>
          <Button variant="outlined" color="secondary">Export</Button>
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
