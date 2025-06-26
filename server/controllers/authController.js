const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token for user authentication
const generateToken = (userId) => {
  return jwt.sign({id: userId}, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Register a new user
const registerUser = async (req, res) => {
  const {username, email, password, profilePic} = req.body;

  try {
    // Check if a user with the same email already exists
    const userExists = await User.findOne({email});
    if (userExists) return res.status(400).json({message: 'Toks vartotojas jau egzistuoja'});

    // Create a new user in the database
    const user = await User.create({
      username,
      email,
      password,
      profilePic,
    });

    // Respond with user info and generated token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: `Uzsiregistruoti nepavyko, del: ${err.message}` });
  }
};

// Authenticate and log in a user
const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    // Find user by email
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: 'El pastas arba slaptazodis yra neteisingas'});

    // Compare password with hashed password in DB
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({message: 'El pastas arba slaptazodis yra neteisingas'});

    // Respond with user info and token
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } catch (err) {
  res.status(500).json({ message: `Uzsiregistruoti nepavyko, del: ${err.message}` });
}
};

// Export authentication controller functions
module.exports = {
  registerUser,
  loginUser,
};