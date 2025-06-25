const express = require('express');
const router = express.Router();
const {
    createQuestion,
    getAllQuestions,
    updateQuestion,
    deleteQuestion,
} = require('../controllers/questionController');
const { verifyToken } = require('../middleware/authMiddleware');
const { toggleLike } = require('../controllers/questionController');

router.post('/create', verifyToken, createQuestion);
router.get('/', verifyToken, getAllQuestions);
router.put('/:id', verifyToken, updateQuestion);
router.delete('/:id', verifyToken, deleteQuestion);
router.patch('/:id/like', verifyToken, toggleLike);

module.exports = router;