import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_COURSE } from "../mutations/courseMutations";
import { GET_COURSES } from "../queries/courseQueries";
import AddLessonModal from "./AddLessonModal";

export default function AddCourseModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [topics, setTopics] = useState("");
  const [lessons, setLessons] = useState([]);
  const [lessonsIds, setLessonsIds] = useState([]);
  const [showLessonForm, setShowLessonForm] = useState(false);

  // GraphQL Mutations
  const [addCourse] = useMutation(ADD_COURSE, {
    variables: {
      title,
      description,
      difficulty,
      topics: topics.split(",").map((topic) => topic.trim()),
      lessons: lessonsIds,
    },
    update(cache, { data: { addCourse } }) {
      const data = cache.readQuery({ query: GET_COURSES });
      if (data) {
        cache.writeQuery({
          query: GET_COURSES,
          data: { courses: [...data.courses, addCourse] },
        });
      }
    },
    onError(error) {
      console.error("Error executing addCourse mutation:", error);
    },
  });

  const saveLesson = (lessonId) => {
    setLessonsIds([...lessonsIds, lessonId]);
    setShowLessonForm(false);
  };

  const handleSavedLessons = (lesson) => {
    setLessons([...lessons, lesson]);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!title || !description || !difficulty) {
        alert("Please fill in all fields");
        return;
      }

      await addCourse({
        variables: {
          title: title,
          description: description,
          difficulty: difficulty,
          topics: topics,
          lessons: lessonsIds,
        },
      });
      // Reset form fields
      setTitle("");
      setDescription("");
      setDifficulty("Beginner");
      setTopics("");
      setLessonsIds([]);
    } catch (error) {
      console.error("Error adding course:", error);
    }
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
                  <div className="mb-3">
                    <label className="form-label">Lessons</label>
                    <div className="mb-3">
                      {lessons.map((lesson, index) => (
                        <div key={index} className="row mb-2">
                          <div className="col">
                            <strong>Title:</strong> {lesson.title}
                          </div>
                          <div className="col">
                            <strong>Content:</strong> {lesson.content}
                          </div>
                          <div className="col">
                            <strong>Quiz added?</strong>{" "}
                            {lesson.quiz.questions ? "YES" : "NO"}
                          </div>
                        </div>
                      ))}

                      {/* ... other code ... */}
                    </div>
                    {/* {quizzes.map((quiz, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center mb-2"
                      >
                        <FaCheck className="text-success me-2" />
                        Quiz {index + 1}
                      </div>
                    ))} */}
                  </div>
                  {showLessonForm && (
                    <div
                      className="modal fade show"
                      style={{ display: "block" }}
                    >
                      {/* You can style this modal as needed */}
                      <AddLessonModal
                        onSaveLessonId={saveLesson}
                        onSaveLesson={handleSavedLessons}
                      />
                    </div>
                  )}
                  <button
                    type="button"
                    className="btn btn-secondary mb-3"
                    onClick={() => setShowLessonForm(true)}
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
