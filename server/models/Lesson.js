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
});

module.exports = mongoose.model("Lesson", lessonSchema);
