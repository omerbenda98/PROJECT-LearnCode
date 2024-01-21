import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COURSES } from "../queries/courseQueries"; // Updated to course queries
import { GET_LESSONS_BY_COURSE } from "../queries/lessonsQueries";
import { UPDATE_COURSE } from "../mutations/courseMutations"; // Updated to course mutations

export default function EditCourseForm({ course }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [difficulty, setDifficulty] = useState(course.difficulty);
  const [topics, setTopics] = useState(course.topics.join(", "));
  const [lessons, setLessons] = useState(course.lessons);
  console.log(lessons);

  const {
    loading: lessonsLoading,
    error: lessonsError,
    data: lessonsData,
  } = useQuery(GET_LESSONS_BY_COURSE, {
    variables: { courseId: course.id },
  });
  console.log(lessonsData);

  const [updateCourse] = useMutation(UPDATE_COURSE, {
    variables: {
      id: course.id,
      title,
      description,
      difficulty,
      topics: topics.split(",").map((topic) => topic.trim()),
    },
    refetchQueries: [{ query: GET_COURSES }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !difficulty) {
      return alert("Please fill out all fields");
    }

    // Parsing topics from string to array of strings
    const topicsArray = topics.split(",").map((topic) => topic.trim());
    console.log("course.id = ", course.id);
    console.log("title = ", title);
    console.log("description = ", description);
    console.log("difficulty = ", difficulty);
    console.log("topicsArray = ", topicsArray);
    // console.log("lessons = ", lessons);
    // Calling the updateCourse mutation with required variables
    updateCourse({
      variables: {
        id: course.id, // Make sure you pass the id of the course
        title,
        description,
        difficulty,
        topics: topicsArray,
        // lessons,
      },
    })
      .then(() => {
        // Handle success (optional)
        console.log("Course updated successfully");
      })
      .catch((error) => {
        // Handle error (optional)
        console.error("Error updating course:", error);
      });
  };

  if (lessonsLoading) return <p>Loading lessons...</p>;
  if (lessonsError) return <p>Error loading lessons: {lessonsError.message}</p>;

  return (
    <div className="mt-5">
      <h3>Update Course Details</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Difficulty</label>
          <select
            id="difficulty"
            className="form-select"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Topics (comma-separated)</label>
          <input
            type="text"
            className="form-control"
            id="topics"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
          />
        </div>
        <h4>Lessons</h4>
        <ul>
          {lessonsData &&
            lessonsData.lessonsByCourse.map((lesson) => (
              <li key={lesson.id}>
                {lesson.title}
                {lesson.quiz && <span> - Includes Quiz</span>}
              </li>
            ))}
        </ul>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
