import React from 'react';
import { canDailyReport } from './canDailyReport';

export function RoleGuard({ role, action, children }) {
  if (!canDailyReport(role, action)) return null;
  return <>{children}</>;
}
