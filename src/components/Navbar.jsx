import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../public/css/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <NavLink to="/" className="logo">
        <img src="../../images/logo.png" className="logo-img"></img>
      </NavLink>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""} onClick={() => setMenuOpen(false)}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/team">Leadership</NavLink>
        </li>
        <li>
          <NavLink to="/plants">Plants</NavLink>
        </li>
        <li>
          <button className="nav-login-button">
            <NavLink to="/login">Login/Sign Up</NavLink>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
