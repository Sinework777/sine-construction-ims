
import React, { useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableHead, TableRow, TableCell, TableBody, Switch, TextField } from '@mui/material';

const demoApprovals = [
  { id: 1, name: 'Submittal #123', type: 'Submittal', status: 'Pending', requestedBy: 'John Doe' },
  { id: 2, name: 'NCR #45', type: 'NCR', status: 'Pending', requestedBy: 'Jane Smith' },
];

export default function WorkflowApprovals() {
  const [workflows, setWorkflows] = useState([
    { name: 'Submittals', enabled: true, approvers: 'Admin, PM' },
    { name: 'NCRs', enabled: true, approvers: 'QAQC, Admin' },
    { name: 'Change Orders', enabled: false, approvers: 'Admin, Cost Eng' },
  ]);
  const [newWorkflow, setNewWorkflow] = useState({ name: '', enabled: true, approvers: '' });

  const handleToggle = idx => {
    setWorkflows(wfs => wfs.map((w, i) => i === idx ? { ...w, enabled: !w.enabled } : w));
  };
  const handleAddWorkflow = () => {
    if (newWorkflow.name) {
      setWorkflows([...workflows, newWorkflow]);
      setNewWorkflow({ name: '', enabled: true, approvers: '' });
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" fontWeight={700} mb={2}>Workflow & Approvals</Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Workflow Configuration</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Enabled</TableCell>
              <TableCell>Approvers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workflows.map((wf, idx) => (
              <TableRow key={idx}>
                <TableCell>{wf.name}</TableCell>
                <TableCell><Switch checked={wf.enabled} onChange={() => handleToggle(idx)} /></TableCell>
                <TableCell>{wf.approvers}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell>
                <TextField size="small" placeholder="New workflow" value={newWorkflow.name} onChange={e => setNewWorkflow(w => ({ ...w, name: e.target.value }))} />
              </TableCell>
              <TableCell>
                <Switch checked={newWorkflow.enabled} onChange={e => setNewWorkflow(w => ({ ...w, enabled: e.target.checked }))} />
              </TableCell>
              <TableCell>
                <TextField size="small" placeholder="Approvers" value={newWorkflow.approvers} onChange={e => setNewWorkflow(w => ({ ...w, approvers: e.target.value }))} />
                <Button size="small" sx={{ ml: 1 }} variant="contained" onClick={handleAddWorkflow}>Add</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={1}>Pending Approvals</Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Requested By</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demoApprovals.map(a => (
              <TableRow key={a.id}>
                <TableCell>{a.id}</TableCell>
                <TableCell>{a.name}</TableCell>
                <TableCell>{a.type}</TableCell>
                <TableCell>{a.status}</TableCell>
                <TableCell>{a.requestedBy}</TableCell>
                <TableCell>
                  <Button size="small" variant="contained" color="success">Approve</Button>
                  <Button size="small" variant="outlined" color="error" sx={{ ml: 1 }}>Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
