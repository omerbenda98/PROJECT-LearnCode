import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";

function LessonRow({ lesson, courseId }) {
  return (
    <div className="card mb-3 shadow-sm">
      {" "}
      <div className="card-body">
        <h5 className="card-title">{lesson.title}</h5>
        <Link
          to={`/courses/${courseId}/lessons/${lesson.id}`}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600y"
        >
          View Lesson
        </Link>
        <button className="btn btn-danger m-2">
          <FaTrash className="icon" /> Delete lesson
        </button>
      </div>
    </div>
  );
}

export default LessonRow;
