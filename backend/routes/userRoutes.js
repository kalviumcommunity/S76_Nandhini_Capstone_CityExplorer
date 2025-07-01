const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User, userValidationSchema } = require('../models/user');
const { protect } = require('../middleware/authMiddleware');
const mongoose = require('mongoose');
const router = express.Router();

// New schema for just validating username
const usernameSchema = Joi.object({
  username: Joi.string().min(3).max(30).alphanum().required()
});

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const { error } = userValidationSchema.validate({ username, password });
    if (error) return res.status(400).json({ message: error.details[0].message });

    const userExists = await User.findOne({ username });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const newUser = new User({ username, password });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ _id: newUser._id, username: newUser.username, token });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({ _id: user._id, username: user.username, token });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Profile GET
router.get('/profile', protect, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ _id: user._id, username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// Profile PUT (Update)
router.put('/profile', protect, async (req, res) => {
  try {
if (!username && !newPassword) {
  return res.status(400).json({ message: 'Please provide a username or a new password to update.' });
}

    if (!mongoose.Types.ObjectId.isValid(req.user._id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username && username !== user.username) {
      const { error } = usernameSchema.validate({ username });
      if (error) return res.status(400).json({ message: error.details[0].message });

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }

      user.username = username;
    }

    if (newPassword) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Current password is required to change password' });
      }

      const isCurrentPasswordValid = await user.comparePassword(currentPassword);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      const { error } = userValidationSchema.validate({ username: user.username, password: newPassword });
      if (error) return res.status(400).json({ message: error.details[0].message });

      user.password = newPassword;
    }

    await user.save();
    res.status(200).json({
      _id: user._id,
      username: user.username,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
