const Answer = require('../models/Answer');

const createAnswer = async (req, res) => {
  try {
    const newAnswer = await Answer.create({
      content: req.body.content,
      author: req.user._id,
      question: req.params.questionId,
    });

    const populated = await newAnswer.populate('author', 'username profilePic');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Klaida kuriant atsakymą', error: err.message });
  }
};

const getAnswersByQuestionId = async (req, res) => {
  try {
    const answers = await Answer.find({ question: req.params.questionId })
      .populate('author', 'username profilePic')
      .sort({ createdAt: -1 });

    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ message: 'Nepavyko gauti atsakymų', error: err.message });
  }
};

module.exports = { createAnswer, getAnswersByQuestionId };