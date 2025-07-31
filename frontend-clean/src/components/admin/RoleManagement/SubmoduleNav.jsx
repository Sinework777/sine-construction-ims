import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const submodules = [
  { label: 'All Roles', value: 'all' },
  { label: 'Admin', value: 'admin' },
  { label: 'Manager', value: 'manager' },
  { label: 'Custom', value: 'custom' },
];

export default function RoleManagementSubmoduleNav() {
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
