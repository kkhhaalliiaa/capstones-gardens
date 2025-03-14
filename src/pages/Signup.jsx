import React from "react";
import { Link } from "react-router-dom";
import "../../public/css/Signup.css";

const Signup = () => {
  return (
    <div className="main-container">
      <div className="signup-photo">
        <img src="../../public/images/signup.jpg" alt="Gardening" />
      </div>
      <div className="signup-container">
        <h1>Get Started Now</h1>
        <form>
          <div className="form-group">
            <label htmlFor="name">First Name:</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="First Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Last Name:</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Example@email.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 8 characters"
              required
            />
          </div>
          <div className="form-group">
            <div className="small-cont">
              <input type="checkbox" id="agreement" name="agreement" />
              <label htmlFor="agreement">
                I agree to the terms & conditions
              </label>
            </div>
          </div>
          <button type="submit">Sign In</button>
          <p className="login-link">
            Returning User? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
