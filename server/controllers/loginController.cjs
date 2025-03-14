const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/dbconfig.cjs');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use environment variable

const handleLogin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields' });
    }

    const findUserQuery = 'SELECT * FROM users WHERE email = ?';

    connection.query(findUserQuery, [email], async (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server Error' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT Token
        const payload = { user: { id: user.id, email: user.email, role: user.role_id } };

        jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'Error generating token' });
            }
            res.json({ token, message: 'Login successful' });
        });
    });
};

module.exports = { handleLogin };
