const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  quiz: {
    questions: [
      {
        text: String,
        options: [String],
        answer: String,
      },
    ],
  },
  isFree: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Lesson", lessonSchema);
