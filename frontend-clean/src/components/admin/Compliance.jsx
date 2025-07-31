
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockCompliance = [
  { id: 1, item: 'Safety Audit', status: 'Compliant', lastChecked: '2025-07-25' },
  { id: 2, item: 'Document Control', status: 'Non-Compliant', lastChecked: '2025-07-24' },
  { id: 3, item: 'QA/QC', status: 'Compliant', lastChecked: '2025-07-23' },
];

const columns = [
  { field: 'item', headerName: 'Compliance Item', flex: 1 },
  { field: 'status', headerName: 'Status', flex: 1 },
  { field: 'lastChecked', headerName: 'Last Checked', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: () => (
      <Button size="small" variant="outlined" color="primary">Audit Log</Button>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function Compliance() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const filtered = mockCompliance.filter(c =>
    (!search || c.item.toLowerCase().includes(search.toLowerCase())) &&
    (!status || c.status === status)
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Compliance</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Status" value={status} onChange={e => setStatus(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Compliant">Compliant</MenuItem>
            <MenuItem value="Non-Compliant">Non-Compliant</MenuItem>
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
