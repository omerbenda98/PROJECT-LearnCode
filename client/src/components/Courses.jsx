import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import CourseCard from "./CourseCard";
import { GET_COURSES } from "../queries/courseQueries";

export default function Courses() {
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong1</p>;

  return (
    <>
      {data.courses.length > 0 ? (
        <div className="row mt-4">
          {data.courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p>No Courses</p>
      )}
    </>
  );
}
