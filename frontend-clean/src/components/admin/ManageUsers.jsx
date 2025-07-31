import React, { useEffect, useState } from 'react';
import {
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, TextField, MenuItem, Select, InputLabel, FormControl, Toolbar, Tooltip, IconButton, CircularProgress, Snackbar, Alert, Checkbox, Grid, Autocomplete, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { Edit, Block, CheckCircle, Delete, FileDownload } from '@mui/icons-material';
import { collection, query, onSnapshot, updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { saveAs } from 'file-saver';
import { useTheme } from '@mui/material/styles';

const statusColors = {
  Active: 'success',
  Suspended: 'error',
  Pending: 'info',
};

const roleOptions = [
  'Executive/Company Owner', 'Project Director', 'Project Manager (PM)', 'QA/QC Engineer', 'HSE/Safety Officer',
  'Superintendent/Site Supervisor', 'Document Controller', 'Cost Engineer/Estimator', 'Procurement Manager',
  'Scheduler/Planner', 'Architect', 'Design Engineer', 'Mechanical Engineer', 'Electrical Engineer', 'Client/Owner',
  'Inspector', 'Finance/Accountant', 'Support/Helpdesk', 'IT Manager / Systems Administrator', 'BIM Coordinator / BIM Manager',
  'Field Engineer', 'Subcontractor', 'Vendor / Supplier', 'Legal / Contracts Manager', 'HR / Human Resources',
  'Logistics / Fleet Manager', 'Quality Manager', 'Environmental Manager', 'Planning Engineer', 'Foreman', 'Surveyor',
  'Reception / Front Desk', 'Marketing / Business Development', 'Training Coordinator', 'Change Manager', 'Asset Manager',
  'Security Officer', 'Communications/PR', 'Client', 'PM', 'QAQC', 'HSE', 'System Admin', 'Super Admin',
];

function StatusChip({ status }) {
  return <Chip label={status} color={statusColors[status] || 'default'} size="small" />;
}

export default function ManageUsers({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [filters, setFilters] = useState({ company: [], project: [], role: [], status: [], search: '' });
  const [editDialog, setEditDialog] = useState({ open: false, user: null });
  const [roleMap, setRoleMap] = useState({});
  const [statusMap, setStatusMap] = useState({});
  const [deleteDialog, setDeleteDialog] = useState({ open: false, user: null });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
      // Pre-fill role/status maps
      const newRoleMap = {};
      const newStatusMap = {};
      data.forEach(u => {
        newRoleMap[u.id] = u.role || '';
        newStatusMap[u.id] = u.status || 'Active';
      });
      setRoleMap(newRoleMap);
      setStatusMap(newStatusMap);
      setLoading(false);
    }, (error) => {
      setLoading(false);
      setSnackbar({ open: true, message: `Failed to load users: ${error.message || error}`, severity: 'error' });
    });
    return () => unsubscribe();
  }, []);

  // Filtering logic
  const filteredUsers = users.filter(u => {
    if (filters.company.length && !filters.company.includes(u.company)) return false;
    if (filters.role.length && !filters.role.includes(u.role)) return false;
    if (filters.status.length && !filters.status.includes(u.status)) return false;
    if (filters.search && !(
      (u.firstName || '').toLowerCase().includes(filters.search.toLowerCase()) ||
      (u.lastName || '').toLowerCase().includes(filters.search.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(filters.search.toLowerCase()) ||
      (u.company || '').toLowerCase().includes(filters.search.toLowerCase())
    )) return false;
    // Project filter placeholder (add project field to user doc if needed)
    if (filters.project.length && (!u.projects || !u.projects.some(p => filters.project.includes(p)))) return false;
    return true;
  });

  // Unique values for filters
  const companies = [...new Set(users.map(u => u.company).filter(Boolean))];
  const roles = [...new Set(users.map(u => u.role).filter(Boolean))];
  const statuses = [...new Set(users.map(u => u.status || 'Active'))];
  // Project filter placeholder
  const projects = [...new Set(users.flatMap(u => u.projects || []))];

  // Handlers
  const handleRoleChange = async (user, newRole) => {
    if (user.id === currentUser?.uid && newRole === 'Suspended') {
      setSnackbar({ open: true, message: 'You cannot suspend yourself.', severity: 'error' });
      return;
    }
    if (user.id === currentUser?.uid && !['Super Admin', 'System Admin'].includes(newRole)) {
      setSnackbar({ open: true, message: 'You cannot remove your own Super Admin access.', severity: 'error' });
      return;
    }
    await updateDoc(doc(db, 'users', user.id), {
      role: newRole,
      roleChangedBy: currentUser?.email || '',
      roleChangedAt: serverTimestamp(),
    });
    setSnackbar({ open: true, message: `Role updated for ${user.email}`, severity: 'success' });
  };

  const handleStatusChange = async (user, newStatus) => {
    if (user.id === currentUser?.uid && newStatus === 'Suspended') {
      setSnackbar({ open: true, message: 'You cannot suspend yourself.', severity: 'error' });
      return;
    }
    await updateDoc(doc(db, 'users', user.id), {
      status: newStatus,
      statusChangedBy: currentUser?.email || '',
      statusChangedAt: serverTimestamp(),
    });
    setSnackbar({ open: true, message: `Status updated for ${user.email}`, severity: 'success' });
  };

  const handleDelete = async (user) => {
    // Implement delete logic with confirmation (not shown for brevity)
    setSnackbar({ open: true, message: `User ${user.email} deleted (not implemented)`, severity: 'info' });
    setDeleteDialog({ open: false, user: null });
  };

  const handleBulkAction = async (action) => {
    for (const userId of selected) {
      const user = users.find(u => u.id === userId);
      if (!user) continue;
      if (action === 'suspend') await handleStatusChange(user, 'Suspended');
      if (action === 'activate') await handleStatusChange(user, 'Active');
      // Add bulk role change if needed
    }
    setSelected([]);
  };

  const handleExport = () => {
    const csv = [
      ['Name', 'Email', 'Company', 'Role', 'Status', 'Signup Date', 'Last Login'],
      ...filteredUsers.map(u => [
        `${u.firstName || ''} ${u.lastName || ''}`.trim(),
        u.email,
        u.company,
        u.role,
        u.status,
        u.signupDate ? new Date(u.signupDate.seconds * 1000).toLocaleDateString() : '',
        u.lastLogin ? new Date(u.lastLogin.seconds * 1000).toLocaleString() : '',
      ]),
    ].map(row => row.map(val => `"${val || ''}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'users.csv');
  };

  return (
    <Paper sx={{ p: 2, mb: 4, width: '100%' }}>
      <Typography variant="h6" fontWeight={700} mb={2}>User Management</Typography>
      {/* Filters */}
      <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item xs={12} sm={6} md={2}>
          <Autocomplete
            multiple
            options={companies}
            value={filters.company}
            onChange={(_, v) => setFilters(f => ({ ...f, company: v }))}
            renderInput={params => <TextField {...params} label="Company" size="small" />}
            disableCloseOnSelect
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Autocomplete
            multiple
            options={projects}
            value={filters.project}
            onChange={(_, v) => setFilters(f => ({ ...f, project: v }))}
            renderInput={params => <TextField {...params} label="Project" size="small" />}
            disableCloseOnSelect
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Autocomplete
            multiple
            options={roleOptions}
            value={filters.role}
            onChange={(_, v) => setFilters(f => ({ ...f, role: v }))}
            renderInput={params => <TextField {...params} label="Role" size="small" />}
            disableCloseOnSelect
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={2}>
          <Autocomplete
            multiple
            options={statuses}
            value={filters.status}
            onChange={(_, v) => setFilters(f => ({ ...f, status: v }))}
            renderInput={params => <TextField {...params} label="Status" size="small" />}
            disableCloseOnSelect
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            label="Global Search"
            size="small"
            value={filters.search}
            onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6} md={1}>
          <Button onClick={() => setFilters({ company: [], project: [], role: [], status: [], search: '' })} fullWidth>Clear</Button>
        </Grid>
      </Grid>
      <Box mb={1}>
        <Typography variant="body2">Showing {filteredUsers.length} users</Typography>
        <Button startIcon={<FileDownload />} onClick={handleExport} sx={{ ml: 2 }}>Export CSV</Button>
      </Box>
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
        <Table size="small" aria-label="User Directory Table">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selected.length > 0 && selected.length < filteredUsers.length}
                  checked={filteredUsers.length > 0 && selected.length === filteredUsers.length}
                  onChange={e => setSelected(e.target.checked ? filteredUsers.map(u => u.id) : [])}
                  inputProps={{ 'aria-label': 'Select all users' }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              {!isMobile && <TableCell>Company</TableCell>}
              {!isMobile && <TableCell>Role</TableCell>}
              <TableCell>Status</TableCell>
              {!isMobile && <TableCell>Signup Date</TableCell>}
              {!isMobile && <TableCell>Last Login</TableCell>}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={isMobile ? 6 : 9}><CircularProgress size={24} /></TableCell></TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow><TableCell colSpan={isMobile ? 6 : 9}><Typography>No users found.</Typography></TableCell></TableRow>
            ) : filteredUsers.map(user => (
              <TableRow key={user.id} hover selected={selected.includes(user.id)}>
                <TableCell padding="checkbox">
                  <Checkbox checked={selected.includes(user.id)} onChange={e => setSelected(sel => e.target.checked ? [...sel, user.id] : sel.filter(id => id !== user.id))} inputProps={{ 'aria-label': `Select user ${user.email}` }} />
                </TableCell>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                {!isMobile && <TableCell>{user.company}</TableCell>}
                {!isMobile && <TableCell>{user.role}</TableCell>}
                <TableCell><StatusChip status={user.status} /></TableCell>
                {!isMobile && <TableCell>{user.signupDate ? new Date(user.signupDate.seconds * 1000).toLocaleDateString() : '-'}</TableCell>}
                {!isMobile && <TableCell>{user.lastLogin ? new Date(user.lastLogin.seconds * 1000).toLocaleString() : '-'}</TableCell>}
                <TableCell>
                  <Tooltip title="Edit Role"><span><IconButton onClick={() => setEditDialog({ open: true, user })}><Edit /></IconButton></span></Tooltip>
                  <Tooltip title={user.status === 'Active' ? 'Suspend' : 'Reactivate'}>
                    <span>
                      <IconButton onClick={() => handleStatusChange(user, user.status === 'Active' ? 'Suspended' : 'Active')} disabled={user.id === currentUser?.uid && user.status === 'Active'}>
                        {user.status === 'Active' ? <Block /> : <CheckCircle />}
                      </IconButton>
                    </span>
                  </Tooltip>
                  <Tooltip title="Delete User"><span><IconButton onClick={() => setDeleteDialog({ open: true, user })} disabled={user.id === currentUser?.uid}><Delete /></IconButton></span></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Bulk Actions */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="error" disabled={selected.length === 0} onClick={() => handleBulkAction('suspend')}>Bulk Suspend</Button>
        <Button variant="contained" color="success" disabled={selected.length === 0} onClick={() => handleBulkAction('activate')}>Bulk Activate</Button>
      </Box>
      {/* Edit Role Dialog */}
      <Dialog open={editDialog.open} onClose={() => setEditDialog({ open: false, user: null })}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={roleOptions}
            value={editDialog.user?.role || ''}
            onChange={(_, newValue) => setEditDialog(ed => ({ ...ed, user: { ...ed.user, role: newValue } }))}
            renderInput={params => <TextField {...params} label="Role" size="small" />}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, user: null })}>Cancel</Button>
          <Button variant="contained" onClick={async () => {
            await handleRoleChange(editDialog.user, editDialog.user.role);
            setEditDialog({ open: false, user: null });
          }}>Save</Button>
        </DialogActions>
      </Dialog>
      {/* Delete User Dialog */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, user: null })}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete user {deleteDialog.user?.email}? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, user: null })}>Cancel</Button>
          <Button variant="contained" color="error" onClick={() => handleDelete(deleteDialog.user)}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
}
