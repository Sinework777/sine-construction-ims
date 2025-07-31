

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, CircularProgress, Alert } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { getBackups, addBackup, updateBackup, deleteBackup } from '../../../services/dataBackupService';


export default function DataBackup() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: '', status: '', date: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getBackups();
      setBackups(data);
    } catch {
      setError('Failed to load backups.');
    }
    setLoading(false);
  };

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    setForm(idx !== null ? backups[idx] : { name: '', status: '', date: '' });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIdx(null);
    setForm({ name: '', status: '', date: '' });
  };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = async () => {
    setSaving(true);
    try {
      if (editIdx !== null) {
        await updateBackup(backups[editIdx].id, form);
      } else {
        await addBackup(form);
      }
      await fetchBackups();
      handleClose();
    } catch {
      setError('Failed to save backup.');
    }
    setSaving(false);
  };
  const handleDelete = async idx => {
    setSaving(true);
    try {
      await deleteBackup(backups[idx].id);
      await fetchBackups();
    } catch {
      setError('Failed to delete backup.');
    }
    setSaving(false);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>Data & Backup Management</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 4 }}>
        <Box>
          <Typography variant="subtitle2">Total Backups</Typography>
          <Typography variant="h6">{backups.length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Completed</Typography>
          <Typography variant="h6" color="success.main">{backups.filter(b => b.status === 'Completed').length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">In Progress</Typography>
          <Typography variant="h6" color="warning.main">{backups.filter(b => b.status === 'In Progress').length}</Typography>
        </Box>
      </Paper>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Backup</Button>
      </Box>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {backups.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(idx)}><Edit /></IconButton>
                    <IconButton color="error" onClick={() => handleDelete(idx)} disabled={saving}><Delete /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIdx !== null ? 'Edit Backup' : 'Add Backup'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Status" name="status" value={form.status} onChange={handleChange} fullWidth />
          <TextField label="Date" name="date" value={form.date} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
