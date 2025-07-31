// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth() || {};

  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
