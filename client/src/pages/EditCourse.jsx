import EditCourseForm from "../components/EditCourseForm";
import { GET_COURSE } from "../queries/courseQueries";
import { useParams } from "react-router-dom";
import { GET_LESSONS_BY_COURSE } from "../queries/lessonsQueries";
import { useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";

export default function EditCourse() {
  const { id } = useParams();
  // const token = localStorage.getItem("token");
  // const user = token ? jwtDecode(token) : null;

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
    <>
      <EditCourseForm course={courseData.course} />
    </>
  );
}
