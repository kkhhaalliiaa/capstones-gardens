const connection = require("../config/dbconfig.cjs");

// Get All Messages
const getMessages = (req, res) => {
    connection.query("SELECT * FROM messages ORDER BY created_at DESC", (err, results) => {
        if (err) {
            console.error("Error fetching messages:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
};

// Create Message
const createMessage = (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields are required" });
    }

    connection.query(
        "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
        [name, email, message],
        (err, result) => {
            if (err) {
                console.error("Error creating message:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ id: result.insertId, name, email, message });
        }
    );
};

// Delete Message by ID
const deleteMessage = (req, res) => {
    const { id } = req.params;

    connection.query("DELETE FROM messages WHERE id = ?", [id], (err, result) => {
        if (err) {
            console.error("Error deleting message:", err);
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Message not found" });
        }
        res.json({ message: "Message deleted successfully" });
    });
};

module.exports = {
    getMessages,
    createMessage,
    deleteMessage,
};
