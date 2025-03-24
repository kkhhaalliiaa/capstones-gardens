import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <NavLink to="/">Go to Home</NavLink>
    </div>
  );
};

export default NotFoundPage;
