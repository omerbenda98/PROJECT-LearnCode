import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import CourseCard from "./CourseCard";
import { GET_COURSES } from "../queries/courseQueries";
import { BouncyCardsFeatures } from "./BouncyCardsFeatures";
import SquishyCard from "./SquishyCard";

export default function Courses() {
  const { loading, error, data } = useQuery(GET_COURSES);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong1</p>;

  return (
    <>
      <BouncyCardsFeatures />
      {data.courses.length > 0 ? (
        <div className="d-flex mt-4">
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
