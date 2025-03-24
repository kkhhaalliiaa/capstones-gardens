// LoginPage.js
import React, { useState, useContext } from "react";
import axios from "axios";
import DOMPurify from "dompurify";
import { UserContext } from "../context/UserContext"; // Import UserContext

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext); // Access the login function from UserContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Sanitize inputs
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedPassword = DOMPurify.sanitize(password);

    if (!sanitizedEmail || !sanitizedPassword) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await axios.post(""https://ismael-capstones-gardens.vercel.app"-1h6s.onrender.com/login", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (response.status === 200) {
        const { token, user } = response?.data || {};
        if (!token || !user) {
          throw new Error("Invalid response from server.");
        }

        // Call the login function from UserContext
        login(user, token);

        // Redirect to home page after login
        window.location.href = "/"; // Optional: Reload the whole page
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;