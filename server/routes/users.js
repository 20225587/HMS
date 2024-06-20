// routes/users.js

const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  const newUser = req.body;
  try {
    const userId = await User.create(newUser);
    res.status(201).json({ id: userId, ...newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user by ID
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  try {
    const result = await User.update(id, updatedUser);
    if (result === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user by ID
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const result = await User.delete(id);
    if (result === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
