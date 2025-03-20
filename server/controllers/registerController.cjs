const bcrypt = require('bcryptjs');
const connection = require('../config/dbconfig.cjs');

const handleRegister = (req, res) => {
  const { firstname, lastname, email, password, username } = req.body;  // Include username here

  // Ensure all fields are present and not empty
  if (!firstname || !lastname || !email || !password || !username) {  // Add username check
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if the email or username already exists
  const checkDuplicateQuery = 'SELECT email, username FROM users WHERE email = ? OR username = ?';
  connection.query(checkDuplicateQuery, [email, username], async (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: 'Server Error' });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'User with this email or username already exists' });
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert the new user into the database
    const registerQuery = 'INSERT INTO users (first_name, last_name, email, password_hash, username, role_id) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(registerQuery, [firstname, lastname, email, hashedPassword, username, 2], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' });
      }
      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

module.exports = { handleRegister };
