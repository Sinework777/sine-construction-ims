import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContextInstance';
import { useNavigate } from 'react-router-dom';
import DashboardPM from '../pages/pm/DashboardPM';
import Home from '../pages/pm/Home';

export default function DashboardRedirectWrapper() {
  const { currentUser, userRole } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const adminEmails = ['admin@sineims.com', 'superadmin@sineims.com'];
    if (
      (userRole && userRole.trim().toLowerCase() === 'system admin') ||
      (currentUser && adminEmails.includes(currentUser.email.trim().toLowerCase()))
    ) {
      navigate('/system/admin', { replace: true });
    }
    // else, stay on dashboard
  }, [currentUser, userRole, navigate]);
  // Render PM dashboard if not system admin
  if (
    (userRole && userRole.trim().toLowerCase() === 'pm') ||
    (currentUser && currentUser.role && currentUser.role.trim().toLowerCase() === 'pm')
  ) {
    return <DashboardPM />;
  }
  // Default fallback
  return <Home />;
}
