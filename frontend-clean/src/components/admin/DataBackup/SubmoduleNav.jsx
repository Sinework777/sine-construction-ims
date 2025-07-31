import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const submodules = [
  { label: 'Backups', value: 'backups' },
  { label: 'Restores', value: 'restores' },
  { label: 'Schedules', value: 'schedules' },
  { label: 'All', value: 'all' },
];

export default function DataBackupSubmoduleNav() {
  const navigate = useNavigate();
  const { module, submodule = 'backups' } = useParams();
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
