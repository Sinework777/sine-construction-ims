import React from 'react';
import { Paper, Typography, InputBase, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function GlobalSearch() {
  return (
    <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', mb: 3 }}>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search anything..." />
      <IconButton type="submit" sx={{ p: 1 }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
