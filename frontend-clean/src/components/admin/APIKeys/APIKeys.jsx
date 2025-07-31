

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, CircularProgress, Alert } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { getAPIKeys, addAPIKey, updateAPIKey, deleteAPIKey } from '../../../services/apiKeysService';


export default function APIKeys() {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: '', key: '', status: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchKeys();
    // eslint-disable-next-line
  }, []);

  const fetchKeys = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getAPIKeys();
      setKeys(data);
    } catch {
      setError('Failed to load API keys.');
    }
    setLoading(false);
  };

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    setForm(idx !== null ? keys[idx] : { name: '', key: '', status: '' });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIdx(null);
    setForm({ name: '', key: '', status: '' });
  };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = async () => {
    setSaving(true);
    try {
      if (editIdx !== null) {
        await updateAPIKey(keys[editIdx].id, form);
      } else {
        await addAPIKey(form);
      }
      await fetchKeys();
      handleClose();
    } catch {
      setError('Failed to save API key.');
    }
    setSaving(false);
  };
  const handleDelete = async idx => {
    setSaving(true);
    try {
      await deleteAPIKey(keys[idx].id);
      await fetchKeys();
    } catch {
      setError('Failed to delete API key.');
    }
    setSaving(false);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>API Keys Management</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 4 }}>
        <Box>
          <Typography variant="subtitle2">Total Keys</Typography>
          <Typography variant="h6">{keys.length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Active</Typography>
          <Typography variant="h6" color="success.main">{keys.filter(k => k.status === 'Active').length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Revoked</Typography>
          <Typography variant="h6" color="error.main">{keys.filter(k => k.status === 'Revoked').length}</Typography>
        </Box>
      </Paper>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Key</Button>
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
                <TableCell>Key</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {keys.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.key}</TableCell>
                  <TableCell>{row.status}</TableCell>
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
        <DialogTitle>{editIdx !== null ? 'Edit Key' : 'Add Key'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Key" name="key" value={form.key} onChange={handleChange} fullWidth />
          <TextField label="Status" name="status" value={form.status} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
