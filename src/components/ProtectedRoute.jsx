import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, user }) => {
  // Check if the user is logged in and has the admin role
  if (!user || user.role_id !== 1) {
    return <Navigate to="/" replace />; 
  }

  return children;
};

export default ProtectedRoute;
