const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  text: String,
  options: [String],
  answer: String,
});

const quizSchema = new mongoose.Schema({
  questions: [questionSchema],
});

module.exports = {
  Quiz: mongoose.model("Quiz", quizSchema),
  Question: mongoose.model("Question", questionSchema),
};
