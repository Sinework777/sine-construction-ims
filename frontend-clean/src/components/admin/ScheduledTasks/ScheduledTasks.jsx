
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const initialTasks = [
  { id: 1, name: 'Nightly Sync', schedule: '0 2 * * *', status: 'Active' },
  { id: 2, name: 'Weekly Report', schedule: '0 6 * * 1', status: 'Paused' },
];

export default function ScheduledTasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ name: '', schedule: '', status: '' });

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    setForm(idx !== null ? tasks[idx] : { name: '', schedule: '', status: '' });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIdx(null);
    setForm({ name: '', schedule: '', status: '' });
  };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = () => {
    if (editIdx !== null) {
      setTasks(m => m.map((item, i) => (i === editIdx ? { ...item, ...form } : item)));
    } else {
      setTasks(m => [...m, { ...form, id: Date.now() }]);
    }
    handleClose();
  };
  const handleDelete = idx => setTasks(m => m.filter((_, i) => i !== idx));

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={2}>Scheduled Tasks Management</Typography>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 4 }}>
        <Box>
          <Typography variant="subtitle2">Total Tasks</Typography>
          <Typography variant="h6">{tasks.length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Active</Typography>
          <Typography variant="h6" color="success.main">{tasks.filter(t => t.status === 'Active').length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Paused</Typography>
          <Typography variant="h6" color="warning.main">{tasks.filter(t => t.status === 'Paused').length}</Typography>
        </Box>
      </Paper>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Task</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Schedule</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.schedule}</TableCell>
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
        <DialogTitle>{editIdx !== null ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Schedule" name="schedule" value={form.schedule} onChange={handleChange} fullWidth />
          <TextField label="Status" name="status" value={form.status} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      {/* TODO: Integrate with real scheduled tasks API */}
    </Box>
  );
}
