import React, { useState } from 'react';
import { Button, Paper, Typography, Alert, TextField, Box } from '@mui/material';
import { createTestUser } from '../scripts/createTestUser';

export default function TestUserCreation() {
  const [email, setEmail] = useState('test.user@example.com');
  const [status, setStatus] = useState('pending_tenant');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const id = await createTestUser({ email, status });
      setResult(`Test user created with ID: ${id}`);
    } catch (e) {
      setError(e.message || 'Error creating test user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 480, mx: 'auto', mt: 6 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Firestore Test User Creation
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Use this page to create a test user in Firestore for workflow testing.
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
        <TextField label="Status" value={status} onChange={e => setStatus(e.target.value)} fullWidth />
        <Button variant="contained" onClick={handleCreate} disabled={loading}>
          {loading ? 'Creating...' : 'Create Test User'}
        </Button>
      </Box>
      {result && <Alert severity="success" sx={{ mt: 2 }}>{result}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
    </Paper>
  );
}
