import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_LESSON } from "../queries/lessonsQueries";
import Spinner from "../components/Spinner";
import Quiz from "../components/Quiz";

function Lesson() {
  const { lessonId } = useParams();

  const [showQuiz, setShowQuiz] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const {
    loading: lessonLoading,
    error: lessonError,
    data: lessonData,
  } = useQuery(GET_LESSON, {
    variables: { id: lessonId },
  });

  if (lessonLoading) return <Spinner />;
  if (lessonError) return <p>Something Went Wrong: {lessonError.message}</p>;

  if (!lessonData) return <p>Lesson not found</p>;

  const { title, contentSections, quiz } = lessonData.lesson;

  const handleNext = () => {
    if (currentSectionIndex < contentSections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };
  console.log(contentSections[currentSectionIndex]);
  return (
    <div className="container mt-4 border h-100">
      <h1 className="display-4">{title}</h1>
      {showQuiz ? (
        <Quiz quiz={quiz} />
      ) : (
        <div>
          <p className="lead mt-4">
            {contentSections[currentSectionIndex].data}
          </p>
          {currentSectionIndex > 0 && (
            <button onClick={handlePrevious} className="btn btn-primary">
              Previous
            </button>
          )}
          {currentSectionIndex < contentSections.length - 1 ? (
            <button onClick={handleNext} className="btn btn-primary">
              Next
            </button>
          ) : (
            <button
              onClick={() => setShowQuiz(true)}
              className="btn btn-secondary"
            >
              Test Your Knowledge
            </button>
          )}
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
