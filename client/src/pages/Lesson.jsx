import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LESSON } from "../queries/lessonsQueries";
import Spinner from "../components/Spinner";
import Quiz from "../components/Quiz";

function Lesson() {
  const { lessonId } = useParams();

  // const { loading, error, data } = useQuery(GET_LESSON, {
  //   variables: { id: lessonId },
  // });

  const [showQuiz, setShowQuiz] = useState(false);

  const {
    loading: lessonLoading,
    error: lessonError,
    data: lessonData,
  } = useQuery(GET_LESSON, {
    variables: { id: lessonId },
  });

  if (lessonLoading) return <Spinner />;
  if (lessonError) return <p>Something Went Wrong: {lessonError.message}</p>;
  if (lessonError) return <p>Quiz Error: {lessonError.message}</p>;

  if (!lessonData) return <p>Lesson not found</p>;

  const { title, content, quiz } = lessonData.lesson;

  return (
    <div className="container mt-4 border h-100">
      <h1 className="display-4">{title}</h1>
      {showQuiz ? (
        <Quiz quiz={quiz} />
      ) : (
        <div>
          <p className="lead mt-4">{content}</p>
          <button
            onClick={() => setShowQuiz(true)}
            className="btn btn-secondary"
          >
            Test Your Knowledge
          </button>
        </div>
      )}
      {showQuiz && (
        <button
          onClick={() => setShowQuiz(false)}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Go Back to Lesson
        </button>
      )}
    </div>
  );
}

export default Lesson;
