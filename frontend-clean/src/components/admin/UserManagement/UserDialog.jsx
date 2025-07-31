import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';

const roles = [
  'System Admin',
  'Project Manager',
  'QA/QC',
  'HSE',
  'User',
];
const statuses = ['Active', 'Pending', 'Inactive'];

export default function UserDialog({ open, onClose, onSave, user }) {
  const [form, setForm] = useState({ name: '', email: '', role: 'User', status: 'Active' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) setForm(user);
    else setForm({ name: '', email: '', role: 'User', status: 'Active' });
    setErrors({});
  }, [user, open]);

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email';
    if (!form.role) errs.role = 'Role is required';
    if (!form.status) errs.status = 'Status is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave({ ...form, id: user?.id });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.email}
          helperText={errors.email}
        />
        <FormControl fullWidth margin="normal" error={!!errors.role}>
          <InputLabel>Role</InputLabel>
          <Select name="role" value={form.role} label="Role" onChange={handleChange}>
            {roles.map(r => <MenuItem key={r} value={r}>{r}</MenuItem>)}
          </Select>
          <FormHelperText>{errors.role}</FormHelperText>
        </FormControl>
        <FormControl fullWidth margin="normal" error={!!errors.status}>
          <InputLabel>Status</InputLabel>
          <Select name="status" value={form.status} label="Status" onChange={handleChange}>
            {statuses.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
          </Select>
          <FormHelperText>{errors.status}</FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
