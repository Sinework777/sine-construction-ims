import React from 'react';
import { Box, Typography, LinearProgress, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

const PHASES = [
  'Audit & Requirements Analysis',
  'Module & Submodule Scaffolding',
  'Deep Integration & Linking',
  'UI/UX & Compliance',
  'Security, Logging, and Extensibility',
  'Automated Error Detection & Correction',
  'Final Testing & Production Readiness',
];

export default function BuildProgress({ currentPhase = 0 }) {
  return (
    <Box sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: 'white', boxShadow: 2, maxWidth: 480, mx: 'auto' }}>
      <Typography variant="h6" fontWeight={700} mb={2} color="primary">PM Dashboard Build Progress</Typography>
      <LinearProgress variant="determinate" value={((currentPhase) / PHASES.length) * 100} sx={{ mb: 2, height: 10, borderRadius: 5 }} />
      <List>
        {PHASES.map((phase, idx) => (
          <ListItem key={phase}>
            <ListItemIcon>
              {idx < currentPhase ? <CheckCircleIcon color="success" /> : idx === currentPhase ? <HourglassEmptyIcon color="primary" /> : <HourglassEmptyIcon color="disabled" />}
            </ListItemIcon>
            <ListItemText primary={phase} primaryTypographyProps={{ fontWeight: idx === currentPhase ? 700 : 400, color: idx === currentPhase ? 'primary.main' : 'text.secondary' }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
