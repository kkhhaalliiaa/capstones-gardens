import React from "react";
import "../../public/css/Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="main-container">
      <div className="login-container">
        <h1>Welcome Back</h1>
        <form>
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
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Remember Me</label>
              <a className="forgot-password">Forgot Password?</a>
            </div>
          </div>
          <button type="submit">Sign In</button>
          <p className="signup-link">
            Don't have an account? <Link to="/Signup">Sign Up</Link>
          </p>
        </form>
      </div>
      <div className="login-photo">
        <img src="../../public/images/login.jpg" alt="Gardening" />
      </div>
    </div>
  );
};

export default Login;
