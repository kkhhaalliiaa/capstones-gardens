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
  const navigate = useNavigate(); // For redirect after successful signup

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize inputs
    const sanitizedFirstName = DOMPurify.sanitize(firstName);
    const sanitizedLastName = DOMPurify.sanitize(lastName);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);
    const sanitizedUsername = DOMPurify.sanitize(username);

    // Ensure agreement checkbox is checked
    if (!agreement) {
      alert("You must agree to the terms and conditions.");
      return;
    }

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
        "http://localhost:3002/register",
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
        <img src="../../public/images/signup.jpg" alt="Gardening" />
      </div>
      <div className="signup-container">
        <h1>Get Started Now</h1>
        <form onSubmit={handleSubmit}>
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
          </div>
          <div className="form-group">
            <div className="small-cont">
              <input
                type="checkbox"
                id="agreement"
                name="agreement"
                checked={agreement}
                onChange={() => setAgreement(!agreement)}
              />
              <label htmlFor="agreement">
                I agree to the terms & conditions
              </label>
            </div>
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
