const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware function to authenticate JWT token
exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // Check if Authorization header is missing
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "No Authorization header provided" });
  }

  // Check for "Bearer" prefix in Authorization header
  const tokenPrefix = "Bearer ";
  if (!authHeader.startsWith(tokenPrefix)) {
    return res.status(401).json({ message: "Otoritas tidak valid" });
  }

  const token = authHeader.slice(tokenPrefix.length);

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: "JWT tidak tersedia" });
  }

  const decoded_id = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded_id).select("-password");

  next();
};

// Middleware for admin
exports.authorizeAdmin = async (req, res, next) => {
  const username = req.user.username;

  try {
    // Find the user in the database by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    // Check if the user has an "admin" role
    if (user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Anda tidak memiliki otoritas untuk mengakses ini" });
    }

    // If the user has an "admin" role, continue to the next middleware function
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

exports.authorizeAdminStock = async (req, res, next) => {
  const username = req.user.username;

  try {
    // Find the user in the database by their username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "User tidak ditemukan" });
    }

    // Check if the user has an "gudang" and "admin" role
    if (user.role !== "gudang" && user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Anda tidak memiliki otoritas untuk mengakses ini" });
    }

    // If the user has an "admin" role, continue to the next middleware function
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
};
