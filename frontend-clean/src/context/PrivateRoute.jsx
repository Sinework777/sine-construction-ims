import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  if (loading) return null; // or a loading spinner
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default PrivateRoute;
