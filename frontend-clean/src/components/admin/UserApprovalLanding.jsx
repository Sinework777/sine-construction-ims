
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack, CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { fetchPendingUsers } from '../../services/userApprovalFetch';

// No more mockApprovals; will fetch from Firestore

const columns = [
  { field: 'name', headerName: 'Name', flex: 1 },
  { field: 'email', headerName: 'Email', flex: 1.2 },
  { field: 'requestedRole', headerName: 'Requested Role', flex: 0.8 },
  { field: 'status', headerName: 'Status', flex: 0.7 },
  { field: 'requestedAt', headerName: 'Requested At', flex: 1 },
  {
    field: 'actions',
    headerName: 'Actions',
    flex: 1,
    renderCell: (params) => (
      <Stack direction="row" spacing={1}>
        <Button size="small" variant="contained" color="success">Approve</Button>
        <Button size="small" variant="outlined" color="error">Reject</Button>
        <Button size="small" variant="outlined">Audit</Button>
      </Stack>
    ),
    sortable: false,
    filterable: false,
  },
];

console.log('UserApprovalLanding mounted');
export default function UserApprovalLanding() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    fetchPendingUsers()
      .then(data => {
        if (mounted) {
          console.log('[UserApprovalLanding] Raw fetched users:', data);
          setUsers(data);
          setLoading(false);
        }
      })
      .catch(err => {
        if (mounted) {
          setError(err.message || 'Failed to fetch users');
          setLoading(false);
        }
      });
    return () => { mounted = false; };
  }, []);

  const filtered = users.filter(u =>
    (!search || (u.fullName || '').toLowerCase().includes(search.toLowerCase()) || (u.email || '').toLowerCase().includes(search.toLowerCase())) &&
    (!status || u.status === status) &&
    (!role || (u.roles && u.roles.includes(role)))
  );
  console.log('[UserApprovalLanding] Filtered users for display:', filtered);

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>User Approval Queue</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Status" value={status} onChange={e => setStatus(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending System Admin">Pending System Admin</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Rejected">Rejected</MenuItem>
          </TextField>
          <TextField label="Role" value={role} onChange={e => setRole(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="PM">PM</MenuItem>
            <MenuItem value="QA/QC">QA/QC</MenuItem>
          </TextField>
          <Box flexGrow={1} />
          <Button variant="contained" color="primary">Bulk Approve</Button>
          <Button variant="outlined" color="secondary">Export</Button>
        </Stack>
        <Box sx={{ height: 400, width: '100%' }}>
          {loading ? (
            <Box display="flex" alignItems="center" justifyContent="center" height={300}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box display="flex" alignItems="center" justifyContent="center" height={300}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <DataGrid
              rows={filtered.map(u => ({
                id: u.email,
                name: u.fullName || '',
                email: u.email,
                requestedRole: (u.roles && u.roles.length > 0) ? u.roles[0] : '',
                status: u.status,
                requestedAt: u.createdAt && u.createdAt.toDate ? u.createdAt.toDate().toLocaleString() : '',
              }))}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              autoHeight
            />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
