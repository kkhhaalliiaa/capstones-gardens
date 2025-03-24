import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Ensure the import path is correct
import "../../public/css/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useContext(UserContext); // Access the user and logout function from context
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
  const navigate = useNavigate();

  // Check if the user is an admin
  useEffect(() => {
    if (user) {
      // Check if the user is an admin (role_id === 1)
      if (user.role_id === 1) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false); // Ensure isAdmin is false if the user is not an admin
      }
    } else {
      setIsAdmin(false); // Ensure isAdmin is false if no user is logged in
    }
  }, [user]); // Re-run this effect when the user changes

  const handleAccountClick = () => {
    if (user) {
      if (isAdmin) {
        navigate("/admin"); // Navigate to admin page if user is admin
      } else {
        navigate("/user"); // Navigate to user page if user is not admin
      }
    } else {
      navigate("/login"); // Navigate to login page if no user is logged in
    }
  };

  const handleLogout = () => {
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav>
      <NavLink to="/" className="logo">
        <img src="../../images/logo.png" className="logo-img" alt="Logo" />
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
          <NavLink to="/customize">Customize</NavLink>
        </li>
        <li>
          {user ? (
            <>
              <button className="nav-login-button" onClick={handleAccountClick}>
                Account
              </button>
            </>
          ) : (
            <button className="nav-login-button" onClick={handleAccountClick}>
              Login/Sign Up
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
