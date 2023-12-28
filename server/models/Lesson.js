const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: String,
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
  },
});

module.exports = mongoose.model("Lesson", lessonSchema);
