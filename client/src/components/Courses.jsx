import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../queries/courseQueries";

import SquishyCard from "./SquishyCard";

export default function Courses() {
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong!</p>;
  const getRandomCourses = (courses) => {
    const shuffled = [...courses].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const randomCourses =
    data.courses.length > 0 ? getRandomCourses(data.courses) : [];

  return (
    <>
      {randomCourses.length > 0 ? (
        <div className="courses-container">
          {randomCourses.map((course) => (
            <SquishyCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p>No Courses</p>
      )}
    </>
  );
}
