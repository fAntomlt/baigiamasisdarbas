const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  createAnswer,
  getAnswersByQuestionId,
} = require('../controllers/answerController');

router.post('/:questionId', verifyToken, createAnswer);
router.get('/:questionId', verifyToken, getAnswersByQuestionId);

module.exports = router;