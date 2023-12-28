// Sample Data for Courses and Lessons
const courses = [
  {
    title: "Introduction to JavaScript",
    description:
      "Learn the fundamentals of JavaScript, the language of the web.",
    difficulty: "Beginner",
    topics: ["Variables", "Functions", "Control Structures"],
    lessons: [
      {
        title: "JavaScript Basics",
        content: "Introduction to variables, data types, and operators.",
      },
      {
        title: "Functions in JavaScript",
        content: "Understanding functions and scope.",
      },
      {
        title: "Control Structures",
        content: "Using if-else statements and loops.",
      },
    ],
  },
  {
    title: "Python for Data Science",
    description:
      "Dive into Python with a focus on data analysis and visualization.",
    difficulty: "Intermediate",
    topics: ["Data Analysis", "Pandas", "Data Visualization"],
    lessons: [
      {
        title: "Data Analysis with Python",
        content: "Introduction to data analysis using Python.",
      },
      {
        title: "Data Manipulation with Pandas",
        content: "Using Pandas for data processing.",
      },
      {
        title: "Data Visualization Techniques",
        content: "Visualizing data using Python libraries.",
      },
    ],
  },
  // ... 3 more courses with their respective lessons
];

export default courses;
