const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const { username, password, fullName } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword, fullName });
    await user.save();
    const token = jwt.sign({ userId: user._id, fullName: user.fullName, username: user.username }, 'secretkey');
    res.status(201).json({ message: 'User created successfully', token });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, fullName: user.fullName, username: user.username }, 'secretkey');

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

router.get('/user', (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, 'secretkey');

    res.json({ fullName: decoded.fullName, username: decoded.username });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user details', error });
  }
});

module.exports = router;