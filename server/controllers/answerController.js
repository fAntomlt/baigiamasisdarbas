const Answer = require('../models/Answer');
const Question = require('../models/Question');

const createAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const questionId = req.params.questionId;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Atsakymo tekstas yra privalomas' });
    }

    // Create the answer
    const newAnswer = await Answer.create({
      content: content.trim(),
      author: req.user._id,
      question: questionId,
    });

    // Increment comment count in the related question
    await Question.findByIdAndUpdate(questionId, { $inc: { comments: 1 } });

    const populated = await newAnswer.populate('author', 'username profilePic');
    res.status(201).json(populated);
  } catch (err) {
    console.error('Klaida kuriant atsakymą:', err);
    res.status(500).json({ message: 'Klaida kuriant atsakymą', error: err.message });
  }
};

const getAnswersByQuestionId = async (req, res) => {
  try {
    const questionId = req.params.questionId;

    const answers = await Answer.find({ question: questionId })
      .populate('author', 'username profilePic')
      .sort({ createdAt: -1 });

    res.status(200).json(answers);
  } catch (err) {
    console.error('Klaida gaunant atsakymus:', err);
    res.status(500).json({ message: 'Nepavyko gauti atsakymų', error: err.message });
  }
};

module.exports = {
  createAnswer,
  getAnswersByQuestionId,
};