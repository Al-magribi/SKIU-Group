const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const {
  authenticateToken,
  authorizeAdmin,
} = require("../handler/auth&authorize");

// CREATE => /api/admin/user/create
router.post("/create", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    // Encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the hashed password
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Return the new user
    return res.status(201).json({ message: "Berhasil ditambahkan", user });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Anda tidak memiliki otoritas untuk mengakses ini" });
  }
});

// REGISTER => /api/admin/users/register
router.post("/register", async (req, res) => {
  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username yang anda masukan sudah terpakai" });
    }

    // Encrypt the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user with the hashed password
    const user = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
      role: "user",
    });

    // Save the user to the database
    await user.save();

    //  Generate a JWT token for the new user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Return the new user
    return res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// LOGIN => /api/admin/user/login
router.post("/login", async (req, res) => {
  try {
    // Find the user by their username
    const user = await User.findOne({ username: req.body.username });

    // If the user is not found, return a 404 Not Found response
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    // Compare the provided password with the stored password using bcrypt
    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // If the password is invalid, return a 401 Unauthorized response
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Password yang anda masukan salah" });
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    // Return a 200 OK response with the authenticated user object as the response body
    return res.status(200).json({
      _id: user._id,
      user: user.name,
      username: user.username,
      role: user.role,
      token: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server Error" });
  }
});

// PROFILE => /api/admin/user/profile
router.get("/profile", authenticateToken, (req, res) => {
  // Return the user profile
  return res.status(200).json({ user: req.user });
});

// ALL USERS => /api/admin/user/all
router.get("/all", authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// DETAIL => /api/admin/user/detail/:id
router.get(
  "/detail/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(user);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// UPDATE => /api/admin/user/update/:id
router.put(
  "/update/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      const { name, username, password } = req.body;

      // Update the user's name, username, and password
      user.name = name;
      user.username = username;
      user.password = await bcrypt.hash(password, 10);

      // Save the updated user to the database
      await user.save();

      // Return the updated user
      res.json({ message: "Berhasil diperbarui", user });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
);

// DELETE => /api/admin/user/delete/:id
router.delete(
  "/delete/:id",
  authenticateToken,
  authorizeAdmin,
  async (req, res) => {
    try {
      // Find the user in the database by id
      const user = await User.findById(req.params.id);

      // If the user doesn't exist, return an error
      if (!user) {
        return res.status(404).json({ message: "user tidak ditemukan" });
      }

      // Delete the user from the database
      await user.deleteOne();

      // Return a success message
      return res.json({ message: "Berhasil dihapus" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
