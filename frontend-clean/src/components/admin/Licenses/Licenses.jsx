
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const initialLicenses = [
  { id: 1, name: 'Enterprise', assigned: 10, total: 20 },
  { id: 2, name: 'QA Module', assigned: 5, total: 5 },
];

export default function Licenses() {
  const [licenses, setLicenses] = useState(initialLicenses);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: '', assigned: '', total: '' });

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    setForm(idx !== null ? licenses[idx] : { name: '', assigned: '', total: '' });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIdx(null);
    setForm({ name: '', assigned: '', total: '' });
  };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = () => {
    if (editIdx !== null) {
      setLicenses(m => m.map((item, i) => (i === editIdx ? { ...item, ...form } : item)));
    } else {
      setLicenses(m => [...m, { ...form, id: Date.now() }]);
    }
    handleClose();
  };
  const handleDelete = idx => setLicenses(m => m.filter((_, i) => i !== idx));

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>License Management</Typography>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 4 }}>
        <Box>
          <Typography variant="subtitle2">Total Licenses</Typography>
          <Typography variant="h6">{licenses.length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Assigned</Typography>
          <Typography variant="h6" color="info.main">{licenses.reduce((a, l) => a + Number(l.assigned), 0)}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Available</Typography>
          <Typography variant="h6" color="success.main">{licenses.reduce((a, l) => a + (Number(l.total) - Number(l.assigned)), 0)}</Typography>
        </Box>
      </Paper>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add License</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Assigned</TableCell>
              <TableCell>Total</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {licenses.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.assigned}</TableCell>
                <TableCell>{row.total}</TableCell>
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
        <DialogTitle>{editIdx !== null ? 'Edit License' : 'Add License'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Assigned" name="assigned" value={form.assigned} onChange={handleChange} fullWidth />
          <TextField label="Total" name="total" value={form.total} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* TODO: Integrate with real licenses API */}
    </Box>
  );
}
