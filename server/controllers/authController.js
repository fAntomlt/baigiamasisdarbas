const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({id: userId}, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

const registerUser = async (req, res) => {
  const {username, email, password, profilePic} = req.body;

  try {
    const userExists = await User.findOne({email});
    if (userExists) return res.status(400).json({message: 'Toks vartotojas jau egzistuoja'});

    const user = await User.create({
      username,
      email,
      password,
      profilePic,
    });

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

const loginUser = async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({email});
    if (!user) return res.status(400).json({message: 'El pastas arba slaptazodis yra neteisingas'});

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({message: 'El pastas arba slaptazodis yra neteisingas'});

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

module.exports = {
  registerUser,
  loginUser,
};