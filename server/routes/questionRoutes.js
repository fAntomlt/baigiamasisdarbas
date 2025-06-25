const express = require('express');
const router = express.Router();
const { createQuestion, getAllQuestions } = require('../controllers/questionController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/create', verifyToken, createQuestion);
router.get('/', verifyToken, getAllQuestions);

module.exports = router;