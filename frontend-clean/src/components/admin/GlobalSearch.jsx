
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockResults = [
  { id: 1, type: 'User', name: 'Alice Smith', detail: 'alice@sine.com' },
  { id: 2, type: 'Project', name: 'HQ Tower', detail: 'Active' },
  { id: 3, type: 'Document', name: 'Safety Plan', detail: 'Approved' },
];

const columns = [
  { field: 'type', headerName: 'Type', flex: 1 },
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'detail', headerName: 'Detail', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: () => (
      <Button size="small" variant="outlined" color="primary">View</Button>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function GlobalSearch() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const filtered = mockResults.filter(r =>
    (!search || r.name.toLowerCase().includes(search.toLowerCase())) &&
    (!type || r.type === type)
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Global Search</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Type" value={type} onChange={e => setType(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="User">User</MenuItem>
            <MenuItem value="Project">Project</MenuItem>
            <MenuItem value="Document">Document</MenuItem>
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
