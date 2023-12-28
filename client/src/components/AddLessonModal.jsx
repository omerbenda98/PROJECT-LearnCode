import { useState } from "react";
// import { FaBook } from "react-icons/fa"; // Changed icon to represent courses
import { useMutation } from "@apollo/client";
import { ADD_COURSE } from "../mutations/courseMutations"; // Assuming you have course mutations defined
import { GET_COURSES } from "../queries/courseQueries"; // Assuming you have course queries defined

export default function AddCourseModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [topics, setTopics] = useState("");
  const [lessons, setLessons] = useState("");

  const [addCourse] = useMutation(ADD_COURSE, {
    variables: {
      title,
      description,
      difficulty,
      topics: topics.split(",").map((topic) => topic.trim()),
      lessons: lessons.split(",").map((lesson) => lesson.trim()),
    },
    update(cache, { data: { addCourse } }) {
      const data = cache.readQuery({ query: GET_COURSES });
      if (data) {
        const { courses } = data;
        cache.writeQuery({
          query: GET_COURSES,
          data: { courses: [...courses, addCourse] },
        });
      }
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();

    if (title === "" || description === "" || difficulty === "") {
      return alert("Please fill in all fields");
    }

    addCourse();

    setTitle("");
    setDescription("");
    setDifficulty("Beginner");
    setTopics("");
  };

  return (
    <>
      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addCourseModal"
      >
        <div className="d-flex align-items-center">
          <FaBook className="icon" />
          <div>New Course</div>
        </div>
      </button> */}

      <div
        className="modal fade"
        id="addCourseModal"
        aria-labelledby="addCourseModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addCourseModalLabel">
                New Course
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                    placeholder="e.g., HTML, CSS, JavaScript"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Topics (comma-separated)</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lessons"
                    value={topics}
                    onChange={(e) => setLessons(e.target.value)}
                    placeholder="loops, arrow functions, etc."
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
