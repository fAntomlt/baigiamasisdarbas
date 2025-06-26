const User = require('../models/User');

// Update logged-in user's profile
const updateUser = async (req, res) => {
    const { username, email, profilePic, newPassword } = req.body;

    try {
        // Find the user by their ID from the authenticated request
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update fields only if they are provided
        if (username) user.username = username;
        if (email) user.email = email;
        if (profilePic) user.profilePic = profilePic;

        // If a new password is provided, assign it
        if (newPassword) user.password = newPassword;
        await user.save();

        // Return updated user data
        res.status(200).json({
            message: 'User updated successfully',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
            },
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to update user', error: err.message });
    }
};

// Export the controller
module.exports = {
  updateUser,
};