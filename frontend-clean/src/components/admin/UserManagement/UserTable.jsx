import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Button, Box, Chip, Menu, MenuItem, Typography } from '@mui/material';

const roleColors = {
  'System Admin': 'primary',
  'Project Manager': 'secondary',
  'QA/QC': 'success',
  'HSE': 'warning',
  'User': 'default',
};

export default function UserTable({ users, onEdit, onDelete, onBulk }) {
  const [selection, setSelection] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 200 },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 140, renderCell: (params) => (
      <Chip label={params.value} color={roleColors[params.value] || 'default'} size="small" />
    ) },
    { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, renderCell: (params) => (
      <Chip label={params.value} color={params.value === 'Active' ? 'success' : params.value === 'Pending' ? 'warning' : 'default'} size="small" />
    ) },
    {
      field: 'actions',
      headerName: 'Actions',
      minWidth: 220,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Button size="small" onClick={() => onEdit(params.row)}>Edit</Button>
          <Button size="small" color="error" onClick={() => onDelete(params.row.id)}>Delete</Button>
        </Box>
      ),
    },
  ];

  const handleBulkMenu = (event) => setAnchorEl(event.currentTarget);
  const handleBulkClose = () => setAnchorEl(null);
  const handleBulkAction = (action) => {
    onBulk(selection, action);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Box sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2">Selected: {selection.length}</Typography>
        <Button
          variant="outlined"
          size="small"
          disabled={selection.length === 0}
          onClick={handleBulkMenu}
        >
          Bulk Actions
        </Button>
        <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleBulkClose}>
          <MenuItem onClick={() => handleBulkAction('deactivate')}>Deactivate</MenuItem>
          <MenuItem onClick={() => handleBulkAction('delete')}>Delete</MenuItem>
        </Menu>
      </Box>
      <DataGrid
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10, 25, 50]}
        checkboxSelection
        disableSelectionOnClick
        onSelectionModelChange={setSelection}
        selectionModel={selection}
        components={{ Toolbar: GridToolbar }}
        autoHeight
      />
    </Box>
  );
}
