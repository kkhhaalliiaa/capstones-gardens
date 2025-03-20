import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}"); // Fallback to empty object


  // Check if the user is logged in and has the admin role
  if (!user || user.role_id !== 1) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
