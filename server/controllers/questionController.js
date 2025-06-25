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
    const populated = await saved.populate('author', 'username profilePic');
    res.status(201).json(populated);
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

const updateQuestion = async (req, res) => {
  const { question } = req.body;

  try {
    const existing = await Question.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Klausimas nerastas' });

    if (existing.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Negalima redaguoti kito naudotojo klausimo' });
    }

    existing.question = question;
    const updated = await existing.save();
    const populated = await updated.populate('author', 'username profilePic');
    res.status(200).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Nepavyko atnaujinti klausimo', error: err.message });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Klausimas nerastas' });

    if (question.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Negalima ištrinti kito naudotojo klausimo' });
    }

    await question.deleteOne();
    res.status(200).json({ message: 'Klausimas ištrintas sėkmingai' });
  } catch (err) {
    res.status(500).json({ message: 'Nepavyko ištrinti klausimo', error: err.message });
  }
};

const toggleLike = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Klausimas nerastas' });

    const userId = req.user._id.toString();

    question.dislikes = question.dislikes.filter(id => id.toString() !== userId);

    if (question.likes.includes(userId)) {
      question.likes = question.likes.filter(id => id.toString() !== userId);
    } else {
      question.likes.push(userId);
    }

    await question.save();
    const populated = await question.populate('author', 'username profilePic');
    res.status(200).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Nepavyko pažymėti patiktuko', error: err.message });
  }
};

const toggleDislike = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: 'Klausimas nerastas' });

    const userId = req.user._id.toString();

    question.likes = question.likes.filter(id => id.toString() !== userId);

    if (question.dislikes.includes(userId)) {
      question.dislikes = question.dislikes.filter(id => id.toString() !== userId);
    } else {
      question.dislikes.push(userId);
    }

    await question.save();
    const populated = await question.populate('author', 'username profilePic');
    res.status(200).json(populated);
  } catch (err) {
    res.status(500).json({ message: 'Nepavyko pažymėti nepatiktuko', error: err.message });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
  toggleLike,
  toggleDislike,
};