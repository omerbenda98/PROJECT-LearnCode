import { useState } from "react";
import StepIndicator from "./StepIndicator";

export default function AddLessonModal({
  onLessonPreview,
  onSaveLessonState,
  currentStep,
  lessonTitleData,
  lessonContentData,
}) {
  const [lessonTitle, setLessonTitle] = useState(lessonTitleData || "");
  const [lessonContent, setLessonContent] = useState(lessonContentData || "");

  const handleLessonNext = () => {
    const lesson = {
      title: lessonTitle,
      content: lessonContent,
    };

    // Pass the lesson to the parent component
    onSaveLessonState(lesson);
    setLessonTitle(lesson.title);
    setLessonTitle(lesson.content);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg w-50">
          <StepIndicator currentStep={currentStep} />
          <div className="space-y-4">
            <div>
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Lesson Title"
              />
            </div>
            <div>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lessonContent}
                onChange={(e) => setLessonContent(e.target.value)}
                placeholder="Lesson Content"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <button
              className="bg-yellow-700 text-white py-2 px-4 rounded hover:bg-yellow-900"
              onClick={onLessonPreview} // Directly use the passed function here
            >
              Previous
            </button>
            <button
              className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
              onClick={handleLessonNext} // Directly use the passed function here
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
