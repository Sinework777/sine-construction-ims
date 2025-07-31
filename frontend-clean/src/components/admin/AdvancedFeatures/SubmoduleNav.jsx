import React from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const submodules = [
  { label: 'All Features', value: 'all' },
  { label: 'Beta', value: 'beta' },
  { label: 'Enterprise', value: 'enterprise' },
  { label: 'Labs', value: 'labs' },
];

export default function AdvancedFeaturesSubmoduleNav() {
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
