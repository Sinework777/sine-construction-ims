import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function NotFoundModule() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Module Not Found</Typography>
        <Typography variant="body1">This module is not yet implemented. Please check back later.</Typography>
      </CardContent>
    </Card>
  );
}
