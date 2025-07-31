import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const submodules = [
  { label: 'General', value: 'general' },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Integrations', value: 'integrations' },
  { label: 'Branding', value: 'branding' },
];

export default function SystemSettingsSubmoduleNav() {
  const navigate = useNavigate();
  const { module, submodule = 'general' } = useParams();
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
