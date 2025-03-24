import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UserProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // Ensure the user is logged in
  if (!user) {
    return <Navigate to="/403" />;
  }

  return children;
};

export default UserProtectedRoute;
