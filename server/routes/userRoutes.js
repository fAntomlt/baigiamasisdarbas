const express = require('express');
const router = express.Router();
const { updateUser } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.put('/update', verifyToken, updateUser);

module.exports = router;