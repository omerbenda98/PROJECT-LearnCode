const mongoose = require("mongoose");

const contentSectionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["introduction", "theory", "example", "summary"],
    required: true,
  },
  data: {
    type: String,
    required: true,
  },
});

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  contentSections: [contentSectionSchema],
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
