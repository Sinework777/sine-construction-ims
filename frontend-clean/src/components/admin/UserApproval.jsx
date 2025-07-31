import React, { useEffect, useState } from 'react';

import {
  Box, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Chip, TextField, MenuItem, Select, InputLabel, FormControl, Toolbar, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress, Snackbar, Alert, Checkbox, Grid, useMediaQuery, Autocomplete
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Check, Close, ArrowUpward, FilterList, GroupAdd, DoneAll, Block } from '@mui/icons-material';
import { collection, query, onSnapshot, updateDoc, serverTimestamp, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { approveUser, denyUser, escalateUser } from '../../services/userApprovalService';

// Status badge colors
const statusColors = {
  pending_tenant: 'warning',
  pending_sysadmin: 'info',
  approved: 'success',
  denied: 'error',
  escalated: 'secondary',
};

function StatusBadge({ status }) {
  const labelMap = {
    pending_tenant: 'Pending Tenant Admin',
    pending_sysadmin: 'Pending System Admin',
    approved: 'Approved',
    denied: 'Denied',
    escalated: 'Escalated',
  };
  return <Chip label={labelMap[status] || status} color={statusColors[status] || 'default'} size="small" />;
}

export default function UserApproval({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState({ company: '', email: '', status: '' });
  const [search, setSearch] = useState('');
  const [actionDialog, setActionDialog] = useState({ open: false, user: null, action: '', bulk: false });
  const [roleMap, setRoleMap] = useState({}); // { [userId]: role }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Comprehensive, industry-standard role list
  const roleOptions = [
    'Executive/Company Owner',
    'Project Director',
    'Project Manager (PM)',
    'QA/QC Engineer',
    'HSE/Safety Officer',
    'Superintendent/Site Supervisor',
    'Document Controller',
    'Cost Engineer/Estimator',
    'Procurement Manager',
    'Scheduler/Planner',
    'Architect',
    'Design Engineer',
    'Mechanical Engineer',
    'Electrical Engineer',
    'Client/Owner',
    'Inspector',
    'Finance/Accountant',
    'Support/Helpdesk',
    'IT Manager / Systems Administrator',
    'BIM Coordinator / BIM Manager',
    'Field Engineer',
    'Subcontractor',
    'Vendor / Supplier',
    'Legal / Contracts Manager',
    'HR / Human Resources',
    'Logistics / Fleet Manager',
    'Quality Manager',
    'Environmental Manager',
    'Planning Engineer',
    'Foreman',
    'Surveyor',
    'Reception / Front Desk',
    'Marketing / Business Development',
    'Training Coordinator',
    'Change Manager',
    'Asset Manager',
    'Security Officer',
    'Communications/PR',
    // Existing roles for compatibility
    'Client',
    'PM',
    'QAQC',
    'HSE',
    'System Admin',
    'Super Admin',
  ];
  const [tenant, setTenant] = useState('');
  const [reason, setReason] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [bulkLoading, setBulkLoading] = useState(false);

  // Real-time updates for users with pending or escalated status
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(u => u.status && (u.status.startsWith('pending') || u.status === 'escalated'));
      setUsers(data);
      // Pre-fill roleMap with requestedRole or existing role
      const newRoleMap = {};
      data.forEach(u => {
        newRoleMap[u.id] = u.requestedRole || u.role || '';
      });
      setRoleMap(newRoleMap);
      setLoading(false);
    }, (error) => {
      setLoading(false);
      setSnackbar({ open: true, message: `Failed to load users: ${error.message || error}`, severity: 'error' });
    });
    return () => unsubscribe();
  }, []);

  // Filtering and search
  const filteredUsers = users.filter(u => {
    if (filter.company && u.company !== filter.company) return false;
    if (filter.status && u.status !== filter.status) return false;
    if (filter.email && !u.email.includes(filter.email)) return false;
    if (search && !(
      u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.company?.toLowerCase().includes(search.toLowerCase())
    )) return false;
    return true;
  });

  // Action handlers
  const handleAction = (user, action, bulk = false) => {
    setActionDialog({ open: true, user, action, bulk });
    setTenant(user?.company || '');
    setReason('');
  };

  const handleBulkAction = async (action) => {
    setBulkLoading(true);
    for (const userId of selected) {
      await processAction(users.find(u => u.id === userId), action, true);
    }
    setBulkLoading(false);
    setSelected([]);
    setSnackbar({ open: true, message: `Bulk ${action} complete`, severity: 'success' });
  };

  const processAction = async (user, action, bulk = false) => {
    if (!user) return;
    try {
      if (action === 'approve') {
        const selectedRole = roleMap[user.id] || user.requestedRole || user.role;
        if (!selectedRole) {
          setSnackbar({ open: true, message: 'Please select a role before approving.', severity: 'warning' });
          return;
        }
        // Update Firestore directly for role, status, audit
        await updateDoc(doc(db, 'users', user.id), {
          role: selectedRole,
          status: 'Active',
          approvedBy: currentUser?.email || '',
          approvedAt: serverTimestamp(),
        });
        // TODO: Trigger email notification here (via backend or cloud function)
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'Active', role: selectedRole } : u));
      } else if (action === 'deny') {
        await denyUser({ userId: user.id, deniedBy: currentUser?.email, reason });
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'denied', denialReason: reason } : u));
      } else if (action === 'escalate') {
        await escalateUser({ userId: user.id, escalatedBy: currentUser?.email });
        setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: 'pending_sysadmin' } : u));
      }
      if (!bulk) setSnackbar({ open: true, message: `User ${action}d`, severity: 'success' });
    } catch (e) {
      setSnackbar({ open: true, message: `Failed to ${action} user: ${e.message || e}`, severity: 'error' });
    }
  };

  // UI
  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      {/* Debug: Show current user UID and role */}
      <Box sx={{ mb: 2, p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Debug: UID: {currentUser?.uid || 'N/A'}
        </Typography>
      </Box>
      <Toolbar sx={{ justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6" fontWeight={700}>User Approval Queue</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField size="small" label="Search" value={search} onChange={e => setSearch(e.target.value)} />
          <FormControl size="small">
            <InputLabel>Status</InputLabel>
            <Select value={filter.status} label="Status" onChange={e => setFilter(f => ({ ...f, status: e.target.value }))}>
              <MenuItem value="">All</MenuItem>
              <MenuItem value="pending_tenant">Pending Tenant Admin</MenuItem>
              <MenuItem value="pending_sysadmin">Pending System Admin</MenuItem>
              <MenuItem value="escalated">Escalated</MenuItem>
            </Select>
          </FormControl>
          <TextField size="small" label="Company" value={filter.company} onChange={e => setFilter(f => ({ ...f, company: e.target.value }))} />
          <TextField size="small" label="Email" value={filter.email} onChange={e => setFilter(f => ({ ...f, email: e.target.value }))} />
        </Box>
      </Toolbar>
      <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
        <Table size="small" aria-label="User Approval Table">
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
              {!isMobile && <TableCell>Requested Role</TableCell>}
              {!isMobile && <TableCell>Signup Date</TableCell>}
              <TableCell>Status</TableCell>
              <TableCell>Role Assignment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={isMobile ? 6 : 9}><CircularProgress size={24} /></TableCell></TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow><TableCell colSpan={isMobile ? 6 : 9}><Typography>No pending users found.</Typography></TableCell></TableRow>
            ) : filteredUsers.map(user => (
              <TableRow key={user.id} selected={selected.includes(user.id)}>
                <TableCell padding="checkbox">
                  <Checkbox checked={selected.includes(user.id)} onChange={e => setSelected(sel => e.target.checked ? [...sel, user.id] : sel.filter(id => id !== user.id))} inputProps={{ 'aria-label': `Select user ${user.email}` }} />
                </TableCell>
                <TableCell>{user.firstName} {user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                {!isMobile && <TableCell>{user.company}</TableCell>}
                {!isMobile && <TableCell>{user.requestedRole || '-'}</TableCell>}
                {!isMobile && <TableCell>{user.signupDate ? new Date(user.signupDate.seconds * 1000).toLocaleDateString() : '-'}</TableCell>}
                <TableCell><StatusBadge status={user.status} /></TableCell>
                {/* Role Assignment Autocomplete */}
                <TableCell sx={{ minWidth: 180 }}>
                  <Autocomplete
                    options={roleOptions}
                    value={roleMap[user.id] || ''}
                    onChange={(_, newValue) => setRoleMap(rm => ({ ...rm, [user.id]: newValue }))}
                    renderInput={params => <TextField {...params} label="Select Role" size="small" required aria-label={`Role for ${user.email}`} />}
                    disabled={user.status === 'Active'}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <Tooltip title="Approve"><span><IconButton color="success" onClick={() => processAction(user, 'approve')} disabled={user.status === 'Active' || !roleMap[user.id]} aria-label={`Approve ${user.email}`}><Check /></IconButton></span></Tooltip>
                  <Tooltip title="Deny"><span><IconButton color="error" onClick={() => handleAction(user, 'deny')} disabled={user.status === 'denied'} aria-label={`Deny ${user.email}`}><Close /></IconButton></span></Tooltip>
                  <Tooltip title="Escalate"><span><IconButton color="secondary" onClick={() => handleAction(user, 'escalate')} disabled={user.status === 'pending_sysadmin'} aria-label={`Escalate ${user.email}`}><ArrowUpward /></IconButton></span></Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Bulk Actions */}
      <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
        <Button variant="contained" color="success" startIcon={<DoneAll />} disabled={selected.length === 0 || bulkLoading} onClick={() => handleBulkAction('approve')}>Bulk Approve</Button>
        <Button variant="contained" color="error" startIcon={<Block />} disabled={selected.length === 0 || bulkLoading} onClick={() => handleBulkAction('deny')}>Bulk Deny</Button>
      </Box>
      {/* Action Dialog */}
      <Dialog open={actionDialog.open} onClose={() => setActionDialog({ open: false, user: null, action: '', bulk: false })}>
        <DialogTitle>{actionDialog.action === 'approve' ? 'Approve User' : actionDialog.action === 'deny' ? 'Deny User' : 'Escalate User'}</DialogTitle>
        <DialogContent>
          {actionDialog.action === 'approve' && (
            <TextField label="Tenant/Company" value={tenant} onChange={e => setTenant(e.target.value)} fullWidth sx={{ mb: 2 }} />
          )}
          {actionDialog.action === 'deny' && (
            <TextField label="Reason for Denial" value={reason} onChange={e => setReason(e.target.value)} fullWidth multiline minRows={2} />
          )}
          {actionDialog.action === 'escalate' && (
            <Typography>Escalate this user to System Admin for final review?</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setActionDialog({ open: false, user: null, action: '', bulk: false })}>Cancel</Button>
          <Button onClick={async () => {
            await processAction(actionDialog.user, actionDialog.action);
            setActionDialog({ open: false, user: null, action: '', bulk: false });
          }} variant="contained" color={actionDialog.action === 'deny' ? 'error' : 'primary'}>
            {actionDialog.action.charAt(0).toUpperCase() + actionDialog.action.slice(1)}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(s => ({ ...s, open: false }))}>
        <Alert severity={snackbar.severity} sx={{ width: '100%' }}>{snackbar.message}</Alert>
      </Snackbar>
    </Paper>
  );
}
