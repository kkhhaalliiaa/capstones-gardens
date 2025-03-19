const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user; // Attach user info to the request object
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token." });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  const { role_id } = req.user; // Assuming `req.user` is populated by `verifyToken`
  if (role_id !== 1) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
  next();
};

// Middleware to restrict access to the user's own data
const isSelfOrAdmin = (req, res, next) => {
  if (req.user.role !== 1 && req.user.id !== parseInt(req.params.id, 10)) {
    return res.status(403).json({ message: "Access denied." });
  }
  next();
};

module.exports = { verifyToken, isAdmin, isSelfOrAdmin };
