import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const submodules = [
  { label: 'All Logs', value: 'all' },
  { label: 'User Activity', value: 'user' },
  { label: 'System Events', value: 'system' },
  { label: 'Security', value: 'security' },
];

export default function AuditLogsSubmoduleNav() {
  const navigate = useNavigate();
  const { module, submodule = 'all' } = useParams();
  const handleChange = (e, value) => {
    navigate(`/admin/system/${module}/${value}`);
  };
  return (
    <Box sx={{ mb: 2 }}>
      <Tabs value={submodule} onChange={handleChange} indicatorColor="primary" textColor="primary">
        {submodules.map((s) => (
          <Tab key={s.value} label={s.label} value={s.value} />
        ))}
      </Tabs>
    </Box>
  );
}
