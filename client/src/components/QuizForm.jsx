import React, { useState } from "react";
import StepIndicator from "./StepIndicator";
import { HiMiniXMark } from "react-icons/hi2";

export default function QuizForm({
  onAddQuiz,
  currentStep,
  onQuizPrev,
  onSubmit,
  onCancel,
}) {
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
  const handleLessonPrev = () => {
    onQuizPrev();
  };
  const handleSubmit = () => {
    onSubmit();
  };
  const handleCancel = () => {
    onCancel();
  };

  const handleReset = () => {
    setQuestions([{ text: "", options: ["", "", "", ""], answer: "" }]);
    setCurrentQuestionIndex(0);
    setQuizSaved(false);
  };

  const question = questions[currentQuestionIndex];
  const isInputDisabled = quizSaved;

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-4 rounded-lg shadow-lg w-1/2 lg:w-1/3">
          <button onClick={handleCancel}>
            <HiMiniXMark size={35} className="icon" />
          </button>
          <StepIndicator currentStep={currentStep} />
          <input
            type="text"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 m-3 w-full"
            value={question.text}
            onChange={(e) => handleQuestionChange(e.target.value)}
            placeholder="Question text"
            disabled={isInputDisabled}
          />
          <div className="flex flex-col items-center space-y-3">
            {question.options.map((option, oIndex) => (
              <input
                key={oIndex}
                type="text"
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 m-3 w-full"
                value={option}
                onChange={(e) => handleOptionChange(oIndex, e.target.value)}
                placeholder={`Option ${oIndex + 1}`}
                disabled={isInputDisabled}
              />
            ))}
            <input
              type="text"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
              value={question.answer}
              onChange={(e) => handleAnswerChange(e.target.value)}
              placeholder="Correct answer"
              disabled={isInputDisabled}
            />
          </div>
          <p className="text-center mt-2">
            {quizSaved
              ? "Quiz Saved"
              : `Questions added: ${questions.length - 1}/5`}
          </p>
          <div className="flex flex-col  justify-center mt-4">
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
              onClick={handleAddQuestion}
              disabled={currentQuestionIndex >= 5 || isInputDisabled}
            >
              Add Question
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mb-2"
              onClick={handleSaveQuiz}
              disabled={isInputDisabled}
            >
              Save Quiz
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleReset}
              disabled={isInputDisabled}
            >
              Reset
            </button>
          </div>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              type="button"
              className="bg-yellow-700 text-white py-2 px-4 rounded hover:bg-yellow-900"
              onClick={handleLessonPrev}
            >
              Previous
            </button>
            <button
              type="button"
              className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
