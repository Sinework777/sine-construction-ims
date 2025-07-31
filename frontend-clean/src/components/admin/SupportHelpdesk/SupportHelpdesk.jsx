
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';

const initialTickets = [
  { id: 1, subject: 'Login Issue', status: 'Open', assigned: 'Alice' },
  { id: 2, subject: 'Data Export', status: 'Closed', assigned: 'Bob' },
];

export default function SupportHelpdesk() {
  const [tickets, setTickets] = useState(initialTickets);
  const [open, setOpen] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [form, setForm] = useState({ subject: '', status: '', assigned: '' });

  const handleOpen = (idx = null) => {
    setEditIdx(idx);
    setForm(idx !== null ? tickets[idx] : { subject: '', status: '', assigned: '' });
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setEditIdx(null);
    setForm({ subject: '', status: '', assigned: '' });
  };
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = () => {
    if (editIdx !== null) {
      setTickets(m => m.map((item, i) => (i === editIdx ? { ...item, ...form } : item)));
    } else {
      setTickets(m => [...m, { ...form, id: Date.now() }]);
    }
    handleClose();
  };
  const handleDelete = idx => setTickets(m => m.filter((_, i) => i !== idx));

  return (
    <Box className="bg-white rounded-xl shadow p-6 mb-8">
      <Typography variant="h5" fontWeight={700} mb={2}>Support & Helpdesk</Typography>
      <ul className="list-disc ml-6 text-gray-700 mb-2">
        <li>Ticketing: Submit, track, and resolve support tickets</li>
        <li>Assignment: Assign tickets to support staff</li>
        <li>Escalation: Escalate urgent issues</li>
        <li>Templates: Use canned responses and templates</li>
      </ul>
      <Paper sx={{ p: 2, mb: 3, display: 'flex', gap: 4 }}>
        <Box>
          <Typography variant="subtitle2">Total Tickets</Typography>
          <Typography variant="h6">{tickets.length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Open</Typography>
          <Typography variant="h6" color="warning.main">{tickets.filter(t => t.status === 'Open').length}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">Closed</Typography>
          <Typography variant="h6" color="success.main">{tickets.filter(t => t.status === 'Closed').length}</Typography>
        </Box>
      </Paper>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" startIcon={<Add />} onClick={() => handleOpen()}>Add Ticket</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((row, idx) => (
              <TableRow key={row.id}>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.assigned}</TableCell>
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
        <DialogTitle>{editIdx !== null ? 'Edit Ticket' : 'Add Ticket'}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 320 }}>
          <TextField label="Subject" name="subject" value={form.subject} onChange={handleChange} fullWidth />
          <TextField label="Status" name="status" value={form.status} onChange={handleChange} fullWidth />
          <TextField label="Assigned" name="assigned" value={form.assigned} onChange={handleChange} fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Support tickets are stored in Firestore collection <code>supportTickets</code>.
      </Typography>
    </Box>
  );
}
