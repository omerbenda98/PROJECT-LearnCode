import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../queries/courseQueries";

import SquishyCard from "./SquishyCard";

export default function Courses() {
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong!</p>;

  return (
    <>
      {data.courses.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.courses.map((course) => (
            <SquishyCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p>No Courses</p>
      )}
    </>
  );
}
