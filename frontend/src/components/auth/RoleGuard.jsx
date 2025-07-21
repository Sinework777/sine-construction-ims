// Centralized role-based access control for Daily Reports
import React from 'react';

export function canDailyReport(role, action) {
  switch (role) {
    case 'pm':
      return ['create','edit','approve','read','comment','download'].includes(action);
    case 'qaqc':
      return ['read','comment','download'].includes(action);
    case 'hse':
      return ['read','download'].includes(action);
    case 'superintendent':
      return ['read','edit','download'].includes(action);
    default:
      return false;
  }
}

export function RoleGuard({ role, action, children }) {
  if (!canDailyReport(role, action)) return null;
  return <>{children}</>;
}
