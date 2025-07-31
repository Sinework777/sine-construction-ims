// src/routes/ProtectedRoutes.jsx


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { fetchUserRole } from '../services/userRoleService';

export default function ProtectedRoutes({ children, requiredRole }) {
  const { currentUser, loading } = useAuth() || {};
  const [status, setStatus] = useState('checking'); // 'checking', 'denied', 'ok'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      if (!currentUser) {
        setStatus('denied');
        navigate('/login', { replace: true });
        return;
      }
      try {
        const role = await fetchUserRole(currentUser.uid);
        // Normalize 'System Admin' role for admin dashboard access
        const normalizedRole = (role === 'System Admin') ? 'System Admin' : role;
        if (!normalizedRole) {
          setError('No user role found. Contact admin.');
          setStatus('denied');
          navigate('/login', { replace: true });
        } else if (requiredRole && (Array.isArray(requiredRole) ? !requiredRole.includes(normalizedRole) : normalizedRole !== requiredRole)) {
          setError('You do not have permission to access this page.');
          setStatus('denied');
          navigate('/login', { replace: true });
        } else {
          setStatus('ok');
        }
      } catch {
        setError('Failed to fetch user role.');
        setStatus('denied');
        navigate('/login', { replace: true });
      }
    }
    if (!loading) checkUser();
  }, [currentUser, loading, requiredRole, navigate]);

  if (loading || status === 'checking') return <div style={{textAlign:'center',marginTop:'20vh'}}>Loading...</div>;
  if (error || status === 'denied') return <div style={{color:'red',textAlign:'center',marginTop:'20vh'}}>{error || 'Access denied.'}</div>;
  return children;
}
