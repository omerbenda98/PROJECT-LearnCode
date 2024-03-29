import { Link, Outlet, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import DeleteCourseButton from "../components/DeleteCourseButton";
import EditCourseForm from "../components/EditCourseForm";
import { useQuery } from "@apollo/client";
import { GET_LESSONS_BY_COURSE } from "../queries/lessonsQueries";
import { GET_COURSE } from "../queries/courseQueries";
import LessonRow from "../components/LessonRow";
import { jwtDecode } from "jwt-decode";

export default function Course() {
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;

  const {
    loading: courseLoading,
    error: courseError,
    data: courseData,
  } = useQuery(GET_COURSE, { variables: { id } });

  const {
    loading: lessonsLoading,
    error: lessonsError,
    data: lessonsData,
  } = useQuery(GET_LESSONS_BY_COURSE, { variables: { courseId: id } });

  if (courseLoading || lessonsLoading) return <Spinner />;

  if (courseError || lessonsError) return <p>Something Went Wrong</p>;

  if (!courseData || !courseData.course)
    return <p>Loading course details...</p>;

  const {
    title,
    description,
    difficulty,
    topic,
    id: courseId,
  } = courseData.course;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-light btn-sm mb-3">
        Back
      </Link>

      <div className="text-center">
        <h1>{title}</h1>
        <p>{description}</p>
        <h5 className="mt-3">Course Difficulty</h5>
        <p className="lead">{difficulty}</p>
        <h5 className="mt-3">Topics Covered</h5>
        <ul className="list-unstyled">{topic}</ul>
      </div>

      <h5 className="mt-3 text-center">Lessons</h5>

      <div className="row">
        <div className="col-md-6">
          {lessonsData && lessonsData.lessonsByCourse.length > 0 ? (
            lessonsData.lessonsByCourse.map((lesson) => (
              <LessonRow key={lesson.id} lesson={lesson} courseId={courseId} />
            ))
          ) : (
            <p>No lessons available for this course.</p>
          )}
        </div>

        <div className="col-md-6">
          <Outlet />
        </div>
      </div>

      {user.role === "ADMIN" && <DeleteCourseButton courseId={courseId} />}
    </div>
  );
}
