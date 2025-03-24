import React from "react";
import { NavLink } from "react-router-dom";

const ForbiddenPage = () => {
  return (
    <div className="forbidden-page">
      <h1>403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <NavLink to="/login">Go to Login</NavLink>
    </div>
  );
};

export default ForbiddenPage;
