const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const connection = require("../config/dbconfig.cjs");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const handleLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please enter both email and password" });
  }

  // Correcting the SQL query to use `role_id`
  const findUserQuery =
    "SELECT user_id, username, first_name, last_name, password_hash, role_id FROM users WHERE email = ?";

  connection.query(findUserQuery, [email], async (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Server Error" });
    }

    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = results[0];

    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT Token with correct user_id
    const payload = { user: { user_id: user.user_id, email: email } };

    jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error generating token" });
      }

      res.json({
        token,
        user: {
          user_id: user.user_id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          role_id: user.role_id,
        },
        message: "Login successful",
      });
    });
  });
};

module.exports = { handleLogin };
