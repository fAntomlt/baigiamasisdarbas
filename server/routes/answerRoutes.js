const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const {
  createAnswer,
  getAnswersByQuestionId,
  updateAnswer,
  deleteAnswer
} = require('../controllers/answerController');

router.post('/:questionId', verifyToken, createAnswer);
router.get('/:questionId', verifyToken, getAnswersByQuestionId);
router.put('/:answerId', verifyToken, updateAnswer);
router.delete('/:answerId', verifyToken, deleteAnswer);

module.exports = router;