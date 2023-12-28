import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_COURSE } from "../mutations/courseMutations";
import { GET_COURSES } from "../queries/courseQueries";
import { useMutation } from "@apollo/client";

export default function DeleteLessonButton({ courseId }) {
  const navigate = useNavigate();

  const [deleteCourse] = useMutation(DELETE_COURSE, {
    variables: { id: courseId },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_COURSES }],
  });

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteCourse}>
        <FaTrash className="icon" /> Delete Course
      </button>
    </div>
  );
}
