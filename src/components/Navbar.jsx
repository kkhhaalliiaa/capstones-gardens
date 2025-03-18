import React from "react";
import { Link } from "react-router-dom";
import "../../public/css/Navbar.css";

const Navbar = () => {
  return (
    <nav>
      <Link to="/" className="logo">
        <img src="../../images/logo.png" className="logo-img"></img>
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/team">Leadership</Link>
        <Link to="/plants">Plants</Link>
        <button className="nav-login-button">
          <Link to="/login">Login/Sign Up</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
