const User = require('../models/User');

const updateUser = async (req, res) => {
    const { username, email, profilePic, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (username) user.username = username;
        if (email) user.email = email;
        if (profilePic) user.profilePic = profilePic;
        if (newPassword) user.password = newPassword;
        await user.save();

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

module.exports = {
  updateUser,
};