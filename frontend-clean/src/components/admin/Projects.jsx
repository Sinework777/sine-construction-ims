
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockProjects = [
  { id: 1, name: 'HQ Tower', company: 'Sine Construction', status: 'Active', client: 'Acme Corp' },
  { id: 2, name: 'Bridge Project', company: 'Sine Construction', status: 'Inactive', client: 'City Gov' },
  { id: 3, name: 'Mall Expansion', company: 'Sine Construction', status: 'Active', client: 'Retail Group' },
];

const columns = [
  { field: 'name', headerName: 'Project Name', flex: 1 },
  { field: 'company', headerName: 'Company', flex: 1 },
  { field: 'client', headerName: 'Client', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 0.7 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: () => (
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="outlined" color="primary">View</Button>
        <Button size="small" variant="outlined" color="error">Archive</Button>
      </Stack>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function Projects() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const filtered = mockProjects.filter(p =>
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (!status || p.status === status)
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Projects</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Status" value={status} onChange={e => setStatus(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
          <Box flexGrow={1} />
          <Button variant="contained" color="primary">Add Project</Button>
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
