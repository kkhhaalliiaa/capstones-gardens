const bcrypt = require("bcryptjs");
const connection = require("../config/dbconfig.cjs");

const getAllUsers = (req, res) => {
  const query =
    "SELECT user_id AS id, first_name, last_name, email, role_id, join_date, status FROM users"; // Ensure correct column names
  connection.query(query, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ message: "Server Error", error: err });
    }
    res.json(results); // Return all users
  });
};

const getUserById = (req, res) => {
  const query =
    "SELECT id, first_name, last_name, email, role_id FROM users WHERE id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Server Error" });
    if (results.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(results[0]);
  });
};

const deleteUser = (req, res) => {
  const query = "DELETE FROM users WHERE id = ?";
  connection.query(query, [req.params.id], (err, results) => {
    if (err)
      return res.status(500).json({ message: "Server Error", error: err });
    if (results.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  });
};

const updatePassword = async (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword)
    return res.status(400).json({ message: "New password required" });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const query = "UPDATE users SET password_hash = ? WHERE id = ?";
    connection.query(query, [hashedPassword, req.params.id], (err, results) => {
      if (err) return res.status(500).json({ message: "Server Error" });
      if (results.affectedRows === 0)
        return res.status(404).json({ message: "User not found" });
      res.json({ message: "Password updated successfully" });
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getAllUsers, getUserById, deleteUser, updatePassword };
