import { useState } from "react";
import StepIndicator from "./StepIndicator";
import { HiMiniXMark } from "react-icons/hi2";

export default function AddLessonModal({
  onLessonPreview,
  onSaveLessonState,
  currentStep,
  lessonTitleData,
  lessonContentData,
  onCancel,
}) {
  const [lessonTitle, setLessonTitle] = useState(lessonTitleData || "");
  const [lessonContent, setLessonContent] = useState(lessonContentData || "");
  const [isLessonFree, setIsLessonFree] = useState(false);

  const handleCancel = () => {
    onCancel();
  };

  const handleLessonNext = () => {
    const lesson = {
      title: lessonTitle,
      content: lessonContent,
      isFree: isLessonFree,
    };

    onSaveLessonState(lesson);
    setLessonTitle(lesson.title);
    setLessonContent(lesson.content);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg w-50">
          <button onClick={handleCancel}>
            <HiMiniXMark size={35} className="icon" />
          </button>
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
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isFreeCheckbox"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  checked={isLessonFree}
                  onChange={(e) => setIsLessonFree(e.target.checked)}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="isFreeCheckbox"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  Make lesson Free
                </label>
              </div>
            </div>
            // ... rest of your component
          </div>
          <div className="flex justify-center space-x-2 mt-4">
            <button
              className="bg-yellow-700 text-white py-2 px-4 rounded hover:bg-yellow-900"
              onClick={onLessonPreview}
            >
              Previous
            </button>
            <button
              className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
              onClick={handleLessonNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
