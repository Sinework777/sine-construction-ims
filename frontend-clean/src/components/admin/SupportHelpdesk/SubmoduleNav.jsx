import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const submodules = [
  { label: 'Tickets', value: 'tickets' },
  { label: 'Knowledge Base', value: 'kb' },
  { label: 'Live Chat', value: 'chat' },
  { label: 'All', value: 'all' },
];

export default function SupportHelpdeskSubmoduleNav() {
  const navigate = useNavigate();
  const { module, submodule = 'tickets' } = useParams();
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
