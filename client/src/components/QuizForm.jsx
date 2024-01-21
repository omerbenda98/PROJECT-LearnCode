import React, { useState } from "react";

export default function QuizForm({ onAddQuiz }) {
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizSaved, setQuizSaved] = useState(false);

  const handleQuestionChange = (value) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (value) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestionIndex].answer = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    if (currentQuestionIndex < 5) {
      setQuestions([
        ...questions,
        { text: "", options: ["", "", "", ""], answer: "" },
      ]);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSaveQuiz = (e) => {
    e.preventDefault();
    if (onAddQuiz) {
      onAddQuiz(questions);
      setQuizSaved(true);
    }
  };

  const handleReset = () => {
    setQuestions([{ text: "", options: ["", "", "", ""], answer: "" }]);
    setCurrentQuestionIndex(0);
    setQuizSaved(false);
  };

  const question = questions[currentQuestionIndex];
  const isInputDisabled = quizSaved;

  return (
    <div className="bg-secondary p-4 rounded w-100">
      <div>
        <div className="row justify-content-center w-100">
          <div className="col-12 col-md-8 mb-3">
            <input
              type="text"
              className="form-control mb-2"
              value={question.text}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Question text"
              disabled={isInputDisabled}
            />
            {question.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                className="form-control mb-2"
                value={option}
                onChange={(e) => handleOptionChange(oIndex, e.target.value)}
                placeholder={`Option ${oIndex + 1}`}
                disabled={isInputDisabled}
              />
            ))}
            <input
              type="text"
              className="form-control mb-2"
              value={question.answer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Correct answer"
              disabled={isInputDisabled}
            />
          </div>
          <div className="col-12 col-md-8 text-center">
            <p>
              {quizSaved
                ? "Quiz Saved"
                : `Questions added: ${questions.length - 1}/5`}
            </p>
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={handleAddQuestion}
              disabled={currentQuestionIndex >= 5 || isInputDisabled}
            >
              Add Question
            </button>
            <button
              type="button"
              className="btn btn-success me-2"
              onClick={handleSaveQuiz}
              disabled={isInputDisabled}
            >
              Save Quiz
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleReset}
              disabled={isInputDisabled}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
