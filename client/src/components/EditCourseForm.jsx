import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_COURSES } from "../queries/courseQueries"; // Updated to course queries
import { UPDATE_COURSE } from "../mutations/courseMutations"; // Updated to course mutations

export default function EditCourseForm({ course }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [difficulty, setDifficulty] = useState(course.difficulty);
  const [topics, setTopics] = useState(course.topics.join(", "));

  const [updateCourse] = useMutation(UPDATE_COURSE, {
    variables: {
      id: course.id,
      title,
      description,
      difficulty,
      topics: topics.split(",").map((topic) => topic.trim()),
    },
    refetchQueries: [{ query: GET_COURSES, variables: { id: course.id } }],
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !difficulty) {
      return alert("Please fill out all fields");
    }

    updateCourse();
  };

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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
