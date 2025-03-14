import React, { useState } from "react";
import "../../public/css/Form.css";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    setName("");
    setEmail("");
    setMessage("");

    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="contact-form">
      <div className="form-content">
        <h2>Contact Us</h2>
        <p>Have questions? Send us a message!</p>

        {submitted ? (
          <p className="success-message">Thank you! Your message has been sent.</p>
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
      </div>
    </section>
  );
};

export default ContactForm;
