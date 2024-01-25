import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COURSES } from "../queries/courseQueries";
import { GET_LESSONS_BY_COURSE } from "../queries/lessonsQueries";
import { UPDATE_COURSE } from "../mutations/courseMutations";

export default function EditCourseForm({ course }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [difficulty, setDifficulty] = useState(course.difficulty);
  const [topic, setTopic] = useState(course.topic);
  const [lessons, setLessons] = useState(course.lessons);

  const {
    loading: lessonsLoading,
    error: lessonsError,
    data: lessonsData,
  } = useQuery(GET_LESSONS_BY_COURSE, {
    variables: { courseId: course.id },
  });

  const [updateCourse] = useMutation(UPDATE_COURSE, {
    variables: {
      id: course.id,
      title,
      description,
      difficulty,
      topic,
    },
    refetchQueries: [{ query: GET_COURSES }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !difficulty) {
      return alert("Please fill out all fields");
    }

    // Calling the updateCourse mutation with required variables
    updateCourse({
      variables: {
        id: course.id, // Make sure you pass the id of the course
        title,
        description,
        difficulty,
        topic,
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
          <label className="text-gray-700 font-medium">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="text-gray-700 font-medium">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="text-gray-700 font-medium">Difficulty</label>
          <select
            id="difficulty"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="text-gray-700 font-medium">
            Topics (comma-separated)
          </label>
          <input
            type="text"
            className="form-control"
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
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

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
