const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  difficulty: String,
  topic: {
    type: String,
    enum: ["HTML", "CSS", "JavaScript", "SQL", "React", "NodeJS"],
    default: "HTML",
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);
