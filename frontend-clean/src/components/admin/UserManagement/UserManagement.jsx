import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Snackbar, CircularProgress } from '@mui/material';
import UserTable from './UserTable';
import UserDialog from './UserDialog';
import { fetchUsers, createUser, updateUser, deleteUser, bulkUpdateUsers } from '../../../api/mock/userApi';

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch {
      setSnackbar({ open: true, message: 'Failed to load users', severity: 'error' });
    }
    setLoading(false);
  };

  useEffect(() => { loadUsers(); }, []);

  const handleCreate = async (user) => {
    try {
      await createUser(user);
      setSnackbar({ open: true, message: 'User created', severity: 'success' });
      loadUsers();
    } catch {
      setSnackbar({ open: true, message: 'Create failed', severity: 'error' });
    }
  };
  const handleEdit = async (user) => {
    try {
      await updateUser(user);
      setSnackbar({ open: true, message: 'User updated', severity: 'success' });
      loadUsers();
    } catch {
      setSnackbar({ open: true, message: 'Update failed', severity: 'error' });
    }
  };
  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      setSnackbar({ open: true, message: 'User deleted', severity: 'success' });
      loadUsers();
    } catch {
      setSnackbar({ open: true, message: 'Delete failed', severity: 'error' });
    }
  };
  const handleBulk = async (userIds, action) => {
    try {
      await bulkUpdateUsers(userIds, action);
      setSnackbar({ open: true, message: 'Bulk action complete', severity: 'success' });
      loadUsers();
    } catch {
      setSnackbar({ open: true, message: 'Bulk action failed', severity: 'error' });
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>User Management</Typography>
        <Button variant="contained" onClick={() => { setEditUser(null); setOpenDialog(true); }}>Add User</Button>
      </Box>
      {loading ? <CircularProgress /> : <UserTable users={users} onEdit={u => { setEditUser(u); setOpenDialog(true); }} onDelete={handleDelete} onBulk={handleBulk} />}
      <UserDialog open={openDialog} onClose={() => setOpenDialog(false)} onSave={editUser ? handleEdit : handleCreate} user={editUser} />
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.message} />
    </Box>
  );
}
