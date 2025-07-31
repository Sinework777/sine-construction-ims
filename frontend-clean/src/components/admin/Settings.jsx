
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockSettings = [
  { id: 1, key: 'Branding', value: 'SINE Construction IMS', status: 'Active' },
  { id: 2, key: 'Theme', value: 'Light', status: 'Active' },
  { id: 3, key: 'Localization', value: 'en-US', status: 'Active' },
];

const columns = [
  { field: 'key', headerName: 'Setting', flex: 1 },
  { field: 'value', headerName: 'Value', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 0.7 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: () => (
      <Button size="small" variant="outlined" color="primary">Edit</Button>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function Settings() {
  const [search, setSearch] = useState('');
  const filtered = mockSettings.filter(s =>
    !search || s.key.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Settings</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
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
