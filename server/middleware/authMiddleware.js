const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware: Verify JWT token and attach user to request
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Check if the Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    // Extract token from header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID from decoded token and exclude the password field
        req.user = await User.findById(decoded.id).select('-password');

        // If user not found in database
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        // Proceed to next middleware/controller
        next();
    } catch (err) {
        // If token is invalid or expired
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

// Export middleware
module.exports = { verifyToken };