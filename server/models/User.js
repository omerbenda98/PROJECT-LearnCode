const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  progress: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
      completedLessons: [mongoose.Schema.Types.ObjectId], // IDs of completed lessons
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
