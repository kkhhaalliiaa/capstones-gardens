import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests
import DOMPurify from "dompurify";
import "../../public/css/Form.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Sanitize inputs
    const sanitizedName = DOMPurify.sanitize(name);
    const sanitizedEmail = DOMPurify.sanitize(email);
    const sanitizedMessage = DOMPurify.sanitize(message);

    try {
      // Send a POST request to the correct backend API
      await axios.post("http://localhost:3002/comments", {
        name: sanitizedName,
        email: sanitizedEmail,
        message: sanitizedMessage,
      });

      // Clear input fields
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(true);
      setError(null);

      // Hide success message after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      console.error("Error submitting message:", err);
      setError("Failed to send message. Please try again later.");
    }
  };

  return (
    <section className="contact-form">
      <div className="form-content">
        <h2>Contact Us</h2>
        <p>Have questions? Send us a message!</p>

        {submitted ? (
          <p className="success-message">
            Thank you! Your message has been sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>
              Enter your name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                required
              />
            </label>

            <label>
              Enter your email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required
              />
            </label>

            <label>
              Your message:
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                required
              ></textarea>
            </label>

            <button type="submit">Send Message</button>
          </form>
        )}

        {error && <p className="error-message">{error}</p>}
      </div>
    </section>
  );
};

export default ContactForm;
