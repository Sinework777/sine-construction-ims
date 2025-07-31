import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import ExtensionIcon from '@mui/icons-material/Extension';
import { Link } from 'react-router-dom';


const modules = [
  {
    label: 'Daily Reports',
    path: '/dailyReports',
    submodules: [
      { label: 'Create Report', path: '/dailyReports/create' },
      { label: 'Review Reports', path: '/dailyReports/review' },
      { label: 'Export Reports', path: '/dailyReports/export' },
    ],
  },
  {
    label: 'QA/QC',
    path: '/qaqc',
    submodules: [
      { label: 'NCRs', path: '/qaqc/ncrs' },
      { label: 'Checklists', path: '/qaqc/checklists' },
      { label: 'Deficiency Log', path: '/qaqc/deficiency-log' },
    ],
  },
  {
    label: 'HSE',
    path: '/hse',
    submodules: [
      { label: 'Daily Reports', path: '/hse/daily-reports' },
      { label: 'Incident Reports', path: '/hse/incident-reports' },
      { label: 'Toolbox Talks', path: '/hse/toolbox-talks' },
      { label: 'Safety Checklists', path: '/hse/safety-checklists' },
    ],
  },
  {
    label: 'BOQ',
    path: '/boq',
    submodules: [
      { label: 'BOQ List', path: '/boq/list' },
      { label: 'BOQ Import', path: '/boq/import' },
    ],
  },
  {
    label: 'Material Logs',
    path: '/materials',
    submodules: [
      { label: 'Material Entry', path: '/materials/entry' },
      { label: 'Material Export', path: '/materials/export' },
    ],
  },
  {
    label: 'Meeting Minutes',
    path: '/meeting-minutes',
    submodules: [
      { label: 'Create Minutes', path: '/meeting-minutes/create' },
      { label: 'Review Minutes', path: '/meeting-minutes/review' },
    ],
  },
  {
    label: 'Document Control',
    path: '/document-control',
    submodules: [
      { label: 'Register', path: '/document-control/register' },
      { label: 'Transmittals', path: '/document-control/transmittals' },
    ],
  },
  {
    label: 'Finance',
    path: '/finance',
    submodules: [
      { label: 'Invoices', path: '/finance/invoices' },
      { label: 'Payments', path: '/finance/payments' },
    ],
  },
  {
    label: 'Audit Logs',
    path: '/audit-logs',
    submodules: [
      { label: 'System Logs', path: '/audit-logs/system' },
      { label: 'User Logs', path: '/audit-logs/user' },
    ],
  },
  {
    label: 'Feature Flags',
    path: '/feature-flags',
    submodules: [
      { label: 'Manage Flags', path: '/feature-flags/manage' },
    ],
  },
  {
    label: 'Licenses',
    path: '/licenses',
    submodules: [
      { label: 'License List', path: '/licenses/list' },
      { label: 'Add License', path: '/licenses/add' },
    ],
  },
  {
    label: 'Backups',
    path: '/backups',
    submodules: [
      { label: 'Backup Now', path: '/backups/now' },
      { label: 'Backup History', path: '/backups/history' },
    ],
  },
];

export default function ConIMSModule() {
  const [openModule, setOpenModule] = React.useState(null);
  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        Construction IMS Modules
      </Typography>
      <List>
        {modules.map((mod) => (
          <React.Fragment key={mod.label}>
            <ListItem
              button
              component={Link}
              to={mod.path}
              onClick={() => setOpenModule(openModule === mod.label ? null : mod.label)}
            >
              <ListItemIcon><ExtensionIcon /></ListItemIcon>
              <ListItemText primary={mod.label} />
            </ListItem>
            {openModule === mod.label && mod.submodules && (
              <List sx={{ pl: 4, bgcolor: '#f5f5f5', borderRadius: 2, mb: 2 }}>
                {mod.submodules.map((sub) => (
                  <ListItem
                    key={sub.label}
                    button
                    component={Link}
                    to={sub.path}
                    sx={{ pl: 4 }}
                  >
                    <ListItemText primary={sub.label} />
                  </ListItem>
                ))}
              </List>
            )}
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}
