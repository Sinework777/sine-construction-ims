import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const submodules = [
  { label: 'Overview', value: 'overview' },
  { label: 'Alerts', value: 'alerts' },
  { label: 'Performance', value: 'performance' },
  { label: 'Logs', value: 'logs' },
];

export default function MonitoringSubmoduleNav() {
  const navigate = useNavigate();
  const { module, submodule = 'overview' } = useParams();
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
