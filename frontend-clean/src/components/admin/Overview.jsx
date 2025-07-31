
import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, Button, TextField, Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const kpis = [
  { label: 'Active Users', value: 128 },
  { label: 'System Health', value: 'Good' },
  { label: 'Pending Approvals', value: 7 },
];

const activityRows = [
  { id: 1, type: 'Login', user: 'Alice Smith', time: '2025-07-27 09:12', status: 'Success' },
  { id: 2, type: 'Approval', user: 'Bob Lee', time: '2025-07-27 08:55', status: 'Pending' },
  { id: 3, type: 'Edit', user: 'Carol Jones', time: '2025-07-26 17:40', status: 'Success' },
];

const activityColumns = [
  { field: 'type', headerName: 'Activity Type', flex: 1 },
  { field: 'user', headerName: 'User', flex: 1 },
  { field: 'time', headerName: 'Time', flex: 1.2 },
  { field: 'status', headerName: 'Status', flex: 0.8 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 0.8,
    renderCell: () => (
      <Button size="small" variant="outlined" color="primary">View</Button>
    ),
    sortable: false,
    filterable: false,
  },
];

export default function Overview() {
  const [search, setSearch] = useState('');
  const filtered = activityRows.filter(row =>
    !search || row.user.toLowerCase().includes(search.toLowerCase()) || row.type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {kpis.map((kpi) => (
          <Grid item xs={12} md={4} key={kpi.label}>
            <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText', minHeight: 120 }}>
              <CardContent>
                <Typography variant="h6">{kpi.label}</Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>{kpi.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Card>
        <CardContent>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
            <TextField label="Search Activity" value={search} onChange={e => setSearch(e.target.value)} size="small" />
            <Box flexGrow={1} />
            <Button variant="contained" color="primary">Export</Button>
          </Stack>
          <Box sx={{ height: 350, width: '100%' }}>
            <DataGrid
              rows={filtered}
              columns={activityColumns}
              pageSize={5}
              rowsPerPageOptions={[5, 10]}
              disableSelectionOnClick
              autoHeight
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
