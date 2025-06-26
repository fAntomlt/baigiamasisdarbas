const express = require('express');
const router = express.Router();
const {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  toggleLike,
  toggleDislike,
} = require('../controllers/questionController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/create', verifyToken, createQuestion);
router.get('/', verifyToken, getAllQuestions);
router.get('/:id', getQuestionById);
router.put('/:id', verifyToken, updateQuestion);
router.delete('/:id', verifyToken, deleteQuestion);
router.patch('/:id/like', verifyToken, toggleLike);
router.patch('/:id/dislike', verifyToken, toggleDislike);

module.exports = router;