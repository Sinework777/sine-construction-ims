


import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Button, TextField, MenuItem, Stack, CircularProgress, Alert, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from '../../axiosInstance';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import AddIcon from '@mui/icons-material/PersonAdd';
import CloseIcon from '@mui/icons-material/Close';


function getColumns(onEdit, onSuspend) {
  return [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.2 },
    { field: 'role', headerName: 'Role', flex: 0.8 },
    { field: 'status', headerName: 'Status', flex: 0.7 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'project', headerName: 'Project', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 0.8,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton size="small" color="primary" onClick={() => onEdit(params.row)}><EditIcon /></IconButton>
          <IconButton size="small" color="error" onClick={() => onSuspend(params.row)}><BlockIcon /></IconButton>
        </Stack>
      ),
      sortable: false,
      filterable: false,
    },
  ];
}


function ManageUsersLanding() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [role, setRole] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, user: null });
  const [editDialog, setEditDialog] = useState({ open: false, user: null });
  const [addDialog, setAddDialog] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', role: '', company: '', project: '' });

  const fetchUsers = () => {
    setLoading(true);
    axios.get('/api/users')
      .then(res => {
        setUsers(res.data);
        setError(null);
      })
      .catch(() => {
        setError('Failed to load users.');
        setUsers([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSuspend = (user) => {
    setConfirmDialog({ open: true, user });
  };

  const confirmSuspend = () => {
    const user = confirmDialog.user;
    axios.patch(`/api/users/${user.id}/status`, { status: user.status === 'Active' ? 'Suspended' : 'Active' })
      .then(() => {
        setSnackbar({ open: true, message: `User ${user.status === 'Active' ? 'suspended' : 'activated'} successfully.`, severity: 'success' });
        fetchUsers();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to update user status.', severity: 'error' }));
    setConfirmDialog({ open: false, user: null });
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, role: user.role, company: user.company, project: user.project });
    setEditDialog({ open: true, user });
  };

  const submitEdit = () => {
    const user = editDialog.user;
    axios.put(`/api/users/${user.id}`, form)
      .then(() => {
        setSnackbar({ open: true, message: 'User updated successfully.', severity: 'success' });
        fetchUsers();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to update user.', severity: 'error' }));
    setEditDialog({ open: false, user: null });
  };

  const handleAdd = () => {
    setForm({ name: '', email: '', role: '', company: '', project: '' });
    setAddDialog(true);
  };

  const submitAdd = () => {
    axios.post('/api/users', form)
      .then(() => {
        setSnackbar({ open: true, message: 'User added successfully.', severity: 'success' });
        fetchUsers();
      })
      .catch(() => setSnackbar({ open: true, message: 'Failed to add user.', severity: 'error' }));
    setAddDialog(false);
  };

  const filtered = users.filter(u =>
    (!search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())) &&
    (!status || u.status === status) &&
    (!role || u.role === role)
  );

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>Manage Users</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
          <TextField label="Search" value={search} onChange={e => setSearch(e.target.value)} size="small" />
          <TextField label="Status" value={status} onChange={e => setStatus(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Suspended">Suspended</MenuItem>
          </TextField>
          <TextField label="Role" value={role} onChange={e => setRole(e.target.value)} size="small" select sx={{ minWidth: 120 }}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="PM">PM</MenuItem>
            <MenuItem value="QA/QC">QA/QC</MenuItem>
          </TextField>
          <Box flexGrow={1} />
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleAdd}>Add User</Button>
          <Button variant="outlined" color="secondary">Export</Button>
        </Stack>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filtered}
              columns={getColumns(handleEdit, handleSuspend)}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              disableSelectionOnClick
              autoHeight
            />
          </Box>
        )}
        {/* Confirm Suspend Dialog */}
        <Dialog open={confirmDialog.open} onClose={() => setConfirmDialog({ open: false, user: null })}>
          <DialogTitle>Confirm {confirmDialog.user?.status === 'Active' ? 'Suspend' : 'Activate'} User</DialogTitle>
          <DialogContent>
            Are you sure you want to {confirmDialog.user?.status === 'Active' ? 'suspend' : 'activate'} user <b>{confirmDialog.user?.name}</b>?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialog({ open: false, user: null })}>Cancel</Button>
            <Button color="error" onClick={confirmSuspend}>{confirmDialog.user?.status === 'Active' ? 'Suspend' : 'Activate'}</Button>
          </DialogActions>
        </Dialog>
        {/* Edit User Dialog */}
        <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, user: null })}>
          <DialogTitle>Edit User</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth />
              <TextField label="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} fullWidth />
              <TextField label="Role" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} select fullWidth>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
                <MenuItem value="QA/QC">QA/QC</MenuItem>
              </TextField>
              <TextField label="Company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} fullWidth />
              <TextField label="Project" value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} fullWidth />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog({ open: false, user: null })}>Cancel</Button>
            <Button onClick={submitEdit} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
        {/* Add User Dialog */}
        <Dialog open={addDialog} onClose={() => setAddDialog(false)}>
          <DialogTitle>Add User</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField label="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} fullWidth />
              <TextField label="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} fullWidth />
              <TextField label="Role" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} select fullWidth>
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="PM">PM</MenuItem>
                <MenuItem value="QA/QC">QA/QC</MenuItem>
              </TextField>
              <TextField label="Company" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} fullWidth />
              <TextField label="Project" value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} fullWidth />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAddDialog(false)}>Cancel</Button>
            <Button onClick={submitAdd} variant="contained">Add</Button>
          </DialogActions>
        </Dialog>
        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar(s => ({ ...s, open: false }))}
          message={snackbar.message}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          action={
            <IconButton size="small" color="inherit" onClick={() => setSnackbar(s => ({ ...s, open: false }))}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        />
      </CardContent>
    </Card>
  );
}
export default ManageUsersLanding;
