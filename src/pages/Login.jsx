import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import "../../public/css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For redirecting after login

  const validateForm = () => {
    let valid = true;
    let errors = "";

    if (!email.trim()) {
      errors = "Email is required.";
      valid = false;
    } else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
      errors = "Enter a valid email address.";
      valid = false;
    }

    if (!password.trim()) {
      errors = "Password is required.";
      valid = false;
    }

    setError(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!validateForm()) return;

    // Sanitize inputs
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    if (!sanitizedEmail || !sanitizedPassword) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(
        "https://capstones-gardens-1h6s.onrender.com/login",
        {
          email: sanitizedEmail,
          password: sanitizedPassword,
        }
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        // Add the email to the user object
        const userWithEmail = {
          ...user,
          email: sanitizedEmail, // Manually add the email
        };

        // Save token and user data to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userWithEmail));

        // Track logged-in users
        const loggedInUsers =
          JSON.parse(localStorage.getItem("loggedInUsers")) || [];
        loggedInUsers.push({
          user_id: user.user_id,
          username: user.username,
          loginTime: new Date().toISOString(),
        });
        localStorage.setItem("loggedInUsers", JSON.stringify(loggedInUsers));

        navigate("/"); // Redirect after login
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="main-container">
      <div className="login-container">
        <h1>Welcome Back</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <div className="small-cont">
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Remember Me</label>
              <Link to="/forgot-password" className="forgot-password">
                Forgot Password?
              </Link>
            </div>
          </div>
          <button type="submit">Sign In</button>
          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
      <div className="login-photo">
        <img src="../../images/login.jpg" alt="Gardening" />
      </div>
    </div>
  );
};

export default Login;
