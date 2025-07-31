

import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, CircularProgress, Alert } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import { getMonitors, addMonitor, updateMonitor, deleteMonitor } from '../../../services/monitoringService';


export default function Monitoring() {
  const [monitors, setMonitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: '', status: '', value: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMonitors();
  }, []);

  const fetchMonitors = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getMonitors();
      setMonitors(data);
    } catch {
      setError('Failed to load monitors.');
    }
    setLoading(false);
  };

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    setForm(idx !== null ? monitors[idx] : { name: '', status: '', value: '' });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIdx(null);
    setForm({ name: '', status: '', value: '' });
  };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = async () => {
    setSaving(true);
    try {
      if (editIdx !== null) {
        await updateMonitor(monitors[editIdx].id, form);
      } else {
        await addMonitor(form);
      }
      await fetchMonitors();
      handleClose();
    } catch {
      setError('Failed to save monitor.');
    }
    setSaving(false);
  };
  const handleDelete = async idx => {
    setSaving(true);
    try {
      await deleteMonitor(monitors[idx].id);
      await fetchMonitors();
    } catch {
      setError('Failed to delete monitor.');
    }
    setSaving(false);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>System Monitoring</Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {/* Dashboard summary */}
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 4 }}>
        <Box>
          <Typography variant="subtitle2">Active Monitors</Typography>
          <Typography variant="h6">{monitors.length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Critical Alerts</Typography>
          <Typography variant="h6" color="error.main">{monitors.filter(m => m.status === 'Critical').length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Warnings</Typography>
          <Typography variant="h6" color="warning.main">{monitors.filter(m => m.status === 'Warning').length}</Typography>
        </Box>
      </Paper>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Monitor</Button>
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
                <TableCell>Value</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {monitors.map((row, idx) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.value}</TableCell>
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
        <DialogTitle>{editIdx !== null ? 'Edit Monitor' : 'Add Monitor'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Status" name="status" value={form.status} onChange={handleChange} fullWidth />
          <TextField label="Value" name="value" value={form.value} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
