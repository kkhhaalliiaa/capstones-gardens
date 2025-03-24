import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import "../../public/css/Signup.css";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Add username state
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // For redirect after successful signup


  const validateForm = () => {
    let valid = true;
    let errors = {};

    if (!username.trim()) {
      errors.username = "Username is required.";
      valid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.username = "Username can only contain letters, numbers, and underscores.";
      valid = false;
    }

    if (!firstName.trim()) {
      errors.firstName = "First name is required.";
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(firstName)) {
      errors.firstName = "First name can only contain letters and spaces.";
      valid = false;
    }

    if (!lastName.trim()) {
      errors.lastName = "Last name is required.";
      valid = false;
    } else if (!/^[A-Za-z\s]+$/.test(lastName)) {
      errors.lastName = "Last name can only contain letters and spaces.";
      valid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(email)) {
      errors.email = "Enter a valid email address.";
      valid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required.";
      valid = false;
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Sanitize inputs
    const sanitizedFirstName = DOMPurify.sanitize(firstName);
    const sanitizedLastName = DOMPurify.sanitize(lastName);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);
    const sanitizedUsername = DOMPurify.sanitize(username);

    // Check if all fields are filled
    if (
      !sanitizedFirstName ||
      !sanitizedLastName ||
      !sanitizedEmail ||
      !sanitizedPassword ||
      !sanitizedUsername
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    const userData = {
      firstname: sanitizedFirstName,
      lastname: sanitizedLastName,
      email: sanitizedEmail,
      password: sanitizedPassword,
      username: sanitizedUsername,
    };

    try {
      const response = await axios.post(
        ""https://ismael-capstones-gardens.vercel.app"-1h6s.onrender.com/register",
        userData
      );

      if (response.status === 201) {
        // Redirect to login page after successful signup
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Error during signup:",
        error.response ? error.response.data : error
      );
      alert(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  return (
    <div className="main-container">
      <div className="signup-photo">
        <img src="../../images/signup.jpg" alt="Gardening" />
      </div>
      <div className="signup-container">
        <h1>Get Started Now</h1>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <span className="error-text">{errors.username}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="first-name">First Name:</label>
            <input
              type="text"
              id="first-name"
              name="first-name"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
             {errors.firstName && <span className="error-text">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="last-name">Last Name:</label>
            <input
              type="text"
              id="last-name"
              name="last-name"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <span className="error-text">{errors.lastName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Example@email.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="At least 8 characters"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit">Sign Up</button>
          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
