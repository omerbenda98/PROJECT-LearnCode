import { useState } from "react";
import { FaBook, FaCheck } from "react-icons/fa"; // Changed icon to represent courses
import { useMutation } from "@apollo/client";
import { ADD_COURSE } from "../mutations/courseMutations"; // Assuming you have course mutations defined
import { GET_COURSES } from "../queries/courseQueries"; // Assuming you have course queries defined

export default function AddCourseModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [topics, setTopics] = useState("");
  const [lessons, setLessons] = useState([]);

  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonContent, setNewLessonContent] = useState("");

  const [addCourse, { error }] = useMutation(ADD_COURSE, {
    variables: {
      title,
      description,
      difficulty,
      topics: topics.split(",").map((topic) => topic.trim()),
      lessons,
    },
    update(cache, { data: { addCourse } }) {
      console.log("here");
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

  if (error) {
    console.error("Error executing addCourse mutation:", error);
  }

  const addLesson = () => {
    console.log(lessons);
    if (newLessonTitle !== "" && newLessonContent !== "") {
      setLessons([
        ...lessons,
        { title: newLessonTitle, content: newLessonContent },
      ]);
      setNewLessonTitle("");
      setNewLessonContent("");
    } else {
      alert("Please fill in both title and content for the lesson");
    }
  };

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
    setLessons([]);
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#addCourseModal"
      >
        <div className="d-flex align-items-center">
          <FaBook className="icon" />
          <div>New Course</div>
        </div>
      </button>

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
                  <label className="form-label">Lessons</label>
                  {lessons.map((lesson, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                      <FaCheck className="text-success me-2" />
                      {lesson.title}
                    </div>
                  ))}
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="Lesson title"
                  />
                  <textarea
                    className="form-control mb-2"
                    value={newLessonContent}
                    onChange={(e) => setNewLessonContent(e.target.value)}
                    placeholder="Lesson content"
                  ></textarea>
                  <button
                    type="button"
                    className="btn btn-secondary mb-3"
                    onClick={addLesson}
                  >
                    Add Lesson
                  </button>
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
