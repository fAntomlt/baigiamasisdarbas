const Question = require('../models/Question');

const createQuestion = async (req, res) => {
  const { question } = req.body;

  try {
    if (!question) {
      return res.status(400).json({ message: 'Klausimas yra privalomas' });
    }

    const newQuestion = new Question({
      question,
      author: req.user._id,
    });

    const saved = await newQuestion.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Nepavyko sukurti klausimo', error: err.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate('author', 'username profilePic')
      .sort({ createdAt: -1 });

    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Nepavyko gauti klausimų', error: err.message });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
};