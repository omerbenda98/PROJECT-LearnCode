import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LESSON } from "../queries/lessonsQueries"; // Assumed GraphQL query to fetch lesson details
import Spinner from "../components/Spinner"; // Assuming you have a Spinner component for loading state

function Lesson() {
  const { lessonId } = useParams();
  console.log(lessonId);
  const { loading, error, data } = useQuery(GET_LESSON, {
    variables: { id: lessonId },
  });

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong: {error.message}</p>;

  if (!data || !data.lesson) return <p>Lesson not found</p>;

  const { title, content } = data.lesson;

  return (
    <div className="container mt-4 border h-100">
      <h1 className="display-4">{title}</h1>
      <p className="lead mt-4">{content}</p>
    </div>
  );
}

export default Lesson;
