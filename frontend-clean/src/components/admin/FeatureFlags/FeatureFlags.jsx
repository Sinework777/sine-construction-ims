
import React, { useState } from 'react';
import FeatureFlagsSubmoduleNav from './SubmoduleNav';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const initialFlags = [
  { id: 1, name: 'New Dashboard', status: 'Enabled' },
  { id: 2, name: 'Beta Feature', status: 'Disabled' },
];

export default function FeatureFlags() {
  const [flags, setFlags] = useState(initialFlags);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: '', status: '' });

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    setForm(idx !== null ? flags[idx] : { name: '', status: '' });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIdx(null);
    setForm({ name: '', status: '' });
  };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = () => {
    if (editIdx !== null) {
      setFlags(m => m.map((item, i) => (i === editIdx ? { ...item, ...form } : item)));
    } else {
      setFlags(m => [...m, { ...form, id: Date.now() }]);
    }
    handleClose();
  };
  const handleDelete = idx => setFlags(m => m.filter((_, i) => i !== idx));

  return (
    <Box>
      <FeatureFlagsSubmoduleNav />
      <Typography variant="h5" fontWeight={700} mb={2}>Feature Flags Management</Typography>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 4 }}>
        <Box>
          <Typography variant="subtitle2">Total Flags</Typography>
          <Typography variant="h6">{flags.length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Enabled</Typography>
          <Typography variant="h6" color="success.main">{flags.filter(f => f.status === 'Enabled').length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Disabled</Typography>
          <Typography variant="h6" color="error.main">{flags.filter(f => f.status === 'Disabled').length}</Typography>
        </Box>
      </Paper>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Flag</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flags.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(idx)}><Edit /></IconButton>
                  <IconButton color="error" onClick={() => handleDelete(idx)}><Delete /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIdx !== null ? 'Edit Flag' : 'Add Flag'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Status" name="status" value={form.status} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* TODO: Integrate with real feature flags API */}
    </Box>
  );
}
