import React from 'react';
import { Navigate } from 'react-router-dom';

export default function RoleGuard({ allowedRole, children }) {
  const sessionUser = JSON.parse(localStorage.getItem('sessionUser') || '{}');
  if (sessionUser.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }
  return children;
}
