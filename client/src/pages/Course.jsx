import { Link, Outlet, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import DeleteCourseButton from "../components/DeleteCourseButton";
import EditCourseForm from "../components/EditCourseForm";
import { useQuery } from "@apollo/client";
import { GET_LESSONS_BY_COURSE } from "../queries/lessonsQueries";
import { GET_COURSE } from "../queries/courseQueries";
import LessonRow from "../components/LessonRow";

export default function Course() {
  const { id } = useParams();

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

  // Render loading spinner while data is being fetched
  if (courseLoading || lessonsLoading) return <Spinner />;

  // Render error message if there's an error
  if (courseError || lessonsError) return <p>Something Went Wrong</p>;

  // Check if course data is loaded
  if (!courseData || !courseData.course)
    return <p>Loading course details...</p>;

  // Destructure course data for rendering
  const {
    title,
    description,
    difficulty,
    topics,
    id: courseId,
  } = courseData.course;

  return (
    <div className="container mt-4">
      <Link to="/" className="btn btn-light btn-sm mb-3">
        Back
      </Link>

      {/* Course details */}
      <div className="text-center">
        <h1>{title}</h1>
        <p>{description}</p>
        <h5 className="mt-3">Course Difficulty</h5>
        <p className="lead">{difficulty}</p>
        <h5 className="mt-3">Topics Covered</h5>
        <ul className="list-unstyled">
          {topics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>

      <h5 className="mt-3 text-center">Lessons</h5>

      {/* List of lessons */}
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

      <EditCourseForm course={courseData.course} />
      <DeleteCourseButton courseId={courseId} />
    </div>
  );
}
