import React, { useState } from "react";

const Quiz = ({ quiz }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false); // New state for tracking quiz completion

  const handleAnswer = (selectedOption) => {
    const currentQuestion = quiz.questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < quiz.questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true); // Set quiz as completed
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setCurrentQuestionIndex(0);
    setQuizStarted(false);
    setQuizCompleted(false);
  };

  return (
    <div className="quiz container mt-4">
      {!quizStarted ? (
        <div className="text-center">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={() => setQuizStarted(true)}
          >
            Start Quiz
          </button>
        </div>
      ) : (
        <div>
          {!quizCompleted ? (
            <>
              <h2 className="text-center mb-4">
                Question {currentQuestionIndex + 1}
              </h2>
              <h4 className="text-center mb-3">
                {quiz.questions[currentQuestionIndex].text}
              </h4>
              <div className="d-flex flex-column align-items-center">
                {quiz.questions[currentQuestionIndex].options.map(
                  (option, index) => (
                    <button
                      key={index}
                      className="btn btn-outline-secondary mb-2"
                      onClick={() => handleAnswer(option)}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
            </>
          ) : (
            <div className="text-center mt-3">
              <div
                className="mb-3"
                style={{ fontSize: "24px", fontWeight: "bold" }}
              >
                Your score: {score} out of {quiz.questions.length}
              </div>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={resetQuiz}
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
