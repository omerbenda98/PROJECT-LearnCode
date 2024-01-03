import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

// LessonRow.jsx
function LessonRow({ lesson, courseId }) {
  return (
    <div className="card mb-3 shadow-sm">
      {" "}
      {/* Added shadow for depth */}
      <div className="card-body">
        <h5 className="card-title">{lesson.title}</h5> {/* Use h5 for title */}
        <Link
          to={`/courses/${courseId}/lessons/${lesson.id}`}
          className="btn btn-primary"
        >
          View Lesson
        </Link>
        <button className="btn btn-danger m-2">
          <FaTrash className="icon" /> Delete lesson
        </button>
        {/* <Link
          to={`/courses/${courseId}/lessons/${lesson.id}/quiz/${lesson.quizId}`}
          className="btn btn-secondary"
        >
          Test Your Knowlwge
        </Link> */}
        {/* Card text for content */}
      </div>
    </div>
  );
}

export default LessonRow;
