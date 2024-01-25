const lessons = [
  {
    title: "JavaScript Basics",
    content: "Introduction to variables, data types, and operators.",
    quiz: {
      questions: [
        {
          text: "What is a variable?",
          options: ["A data type", "A storage location", "A function"],
          answer: "A storage location",
        },
      ],
    },
  },
  {
    title: "Functions in JavaScript",
    content: "Understanding functions and scope.",
    quiz: {
      questions: [
        {
          text: "What is a variable?",
          options: ["A data type", "A storage location", "A function"],
          answer: "A storage location",
        },
      ],
    },
  },
  {
    title: "Control Structures",
    content: "Using if-else statements and loops.",
    quiz: {
      questions: [
        {
          text: "What is a variable?",
          options: ["A data type", "A storage location", "A function"],
          answer: "A storage location",
        },
      ],
    },
  },
];

const courses = [
  {
    title: "Introduction to JavaScript",
    description:
      "Learn the fundamentals of JavaScript, the language of the web.",
    difficulty: "Beginner",
    topic: "JavaScript",
    lessons: [],
  },
];

module.exports = { lessons, courses };
