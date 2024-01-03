import React, { useState } from "react";

export default function QuizForm({ onAddQuiz }) {
  const [questions, setQuestions] = useState([
    { text: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

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
    if (currentQuestionIndex < 4) {
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
    }
  };

  const question = questions[currentQuestionIndex];

  return (
    <div className="container bg-secondary p-4 w-100 rounded">
      <div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 mb-3">
            <input
              type="text"
              className="form-control mb-2"
              value={question.text}
              onChange={(e) => handleQuestionChange(e.target.value)}
              placeholder="Question text"
            />
            {question.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                className="form-control mb-2"
                value={option}
                onChange={(e) => handleOptionChange(oIndex, e.target.value)}
                placeholder={`Option ${oIndex + 1}`}
              />
            ))}
            <input
              type="text"
              className="form-control mb-2"
              value={question.answer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Correct answer"
            />
          </div>
          <div className="col-12 col-md-8 text-center">
            <button
              type="button"
              className="btn btn-primary me-2"
              onClick={handleAddQuestion}
              disabled={currentQuestionIndex >= 4}
            >
              Add Question
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleSaveQuiz}
            >
              Save Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
