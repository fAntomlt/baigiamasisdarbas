const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
  {
    question: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: {
        type: Number,
        default: 0,
    },
    dislikes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
  },
  { timestamps: true }
);

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;