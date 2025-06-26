const Answer = require('../models/Answer');
const Question = require('../models/Question');

// Create a new answer for a specific question
const createAnswer = async (req, res) => {
  try {
    const { content } = req.body;
    const questionId = req.params.questionId;

    // Validate that content is not empty or just whitespace
    if (!content || !content.trim()) {
      return res.status(400).json({ message: 'Atsakymo tekstas yra privalomas' });
    }

    // Create the new answer and link it to the question and author
    const newAnswer = await Answer.create({
      content: content.trim(),
      author: req.user._id,
      question: questionId,
    });

    // Increment the comment count on the associated question
    await Question.findByIdAndUpdate(questionId, { $inc: { comments: 1 } });

    // Populate author details before sending response
    const populated = await newAnswer.populate('author', 'username profilePic');
    res.status(201).json(populated);
  } catch (err) {
    console.error('Klaida kuriant atsakymą:', err);
    res.status(500).json({ message: 'Klaida kuriant atsakymą', error: err.message });
  }
};

// Get all answers for a specific question
const getAnswersByQuestionId = async (req, res) => {
  try {
    const questionId = req.params.questionId;

    // Find and sort answers by newest first, with author info populated
    const answers = await Answer.find({ question: questionId })
      .populate('author', 'username profilePic')
      .sort({ createdAt: -1 });

    res.status(200).json(answers);
  } catch (err) {
    console.error('Klaida gaunant atsakymus:', err);
    res.status(500).json({ message: 'Nepavyko gauti atsakymų', error: err.message });
  }
};

// Update an answer if the user is the author
const updateAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId);

    // Check if answer exists
    if (!answer) return res.status(404).json({ message: 'Atsakymas nerastas' });

    // Check if the current user is the author of the answer
    if (String(answer.author) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Neturite teisės redaguoti' });
    }

    // Update content and updatedAt timestamp
    answer.content = req.body.content || answer.content;
    answer.updatedAt = new Date();
    await answer.save();

    // Populate author details before sending response
    const populated = await answer.populate('author', 'username profilePic');
    res.status(200).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Klaida redaguojant atsakymą', error: err.message });
  }
};

// Delete an answer if the user is the author
const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findById(req.params.answerId);

    // Check if answer exists
    if (!answer) return res.status(404).json({ message: 'Atsakymas nerastas' });

    // Check if the current user is the author of the answer
    if (String(answer.author) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Neturite teisės ištrinti' });
    }

    // Delete the answer
    await answer.deleteOne();
    res.status(200).json({ message: 'Atsakymas ištrintas' });
  } catch (err) {
    res.status(500).json({ message: 'Klaida trinant atsakymą', error: err.message });
  }
};

// Export controller functions
module.exports = {
  createAnswer,
  getAnswersByQuestionId,
  updateAnswer,
  deleteAnswer
};