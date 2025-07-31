
import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const mockAnalytics = [
  { id: 1, metric: 'Active Users', value: 128, date: '2025-07-27' },
  { id: 2, metric: 'Module Adoption', value: '85%', date: '2025-07-27' },
  { id: 3, metric: 'System Load', value: 'Normal', date: '2025-07-27' },
];

const columns = [
  { field: 'metric', headerName: 'Metric', flex: 1 },
  { field: 'value', headerName: 'Value', flex: 1 },
  { field: 'date', headerName: 'Date', flex: 1 },
];

export default function Analytics() {
  const [search, setSearch] = useState('');
  const filtered = mockAnalytics.filter(row =>
    !search || row.metric.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Analytics</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search Metric" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <Box flexGrow={1} />
          <Button variant="outlined" color="secondary">Export</Button>
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
