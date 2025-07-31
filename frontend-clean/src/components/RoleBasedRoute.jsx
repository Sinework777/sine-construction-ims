import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { fetchUserRole } from '../services/userRoleService';

const RoleBasedRoute = ({ requiredRole, children }) => {
  const { currentUser } = useAuth() || {};
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    async function checkRole() {
      if (!currentUser) {
        setStatus('denied');
        return;
      }
      // Super Admin dashboard: check email directly
      if (requiredRole === 'superadmin@sineims.com') {
        if (currentUser.email !== 'superadmin@sineims.com') {
          setStatus('denied');
          return;
        } else {
          setStatus('ok');
          return;
        }
      }
      const role = await fetchUserRole(currentUser.uid);
      // Accept 'System Admin' as valid admin role
      const normalizedRole = (role === 'System Admin') ? 'admin' : role;
      if (!normalizedRole) {
        setStatus('denied');
      } else if (requiredRole && (Array.isArray(requiredRole) ? !requiredRole.includes(normalizedRole) : normalizedRole !== requiredRole)) {
        setStatus('denied');
      } else {
        setStatus('ok');
      }
    }
    checkRole();
  }, [currentUser, requiredRole]);

  if (status === 'checking') return <div style={{textAlign:'center',marginTop:'20vh'}}>Loading...</div>;
  if (status === 'denied') return <Navigate to="/dashboard" replace />;
  return children;
};

export default RoleBasedRoute;
  // const [userRole, setUserRole] = useState(null); // Removed unused variable to fix linter error
