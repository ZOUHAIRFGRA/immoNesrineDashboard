const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key'; // Change this to a secret key for JWT

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username,password });
    res.status(201).json({ success: true, user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Login user and generate JWT token
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new Error('User not found');

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1000h' });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
};

