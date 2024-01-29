import { useState } from "react";
import StepIndicator from "./StepIndicator";
import { HiMiniXMark } from "react-icons/hi2";

export default function AddLessonModal({
  onLessonPreview,
  onSaveLessonState,
  currentStep,
  onCancel,
  lessonErrors,
}) {
  const [lessonTitle, setLessonTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [theory, setTheory] = useState("");
  const [example, setExample] = useState("");
  const [summary, setSummary] = useState("");
  const [isLessonFree, setIsLessonFree] = useState(false);

  const handleCancel = () => {
    onCancel();
  };

  const handleLessonNext = () => {
    const lesson = {
      title: lessonTitle,
      contentSections: [
        { type: "INTRODUCTION", data: introduction },
        { type: "THEORY", data: theory },
        { type: "EXAMPLE", data: example },
        { type: "SUMMARY", data: summary },
      ],
      isFree: isLessonFree,
    };

    onSaveLessonState(lesson);
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
        <div className="mx-auto bg-white p-6 rounded-lg shadow-lg w-50">
          <button onClick={handleCancel}>
            <HiMiniXMark size={35} className="icon" />
          </button>
          <StepIndicator currentStep={currentStep} />
          <div className="space-y-4">
            {currentStep === 2 && (
              <input
                type="text"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
                placeholder="Lesson Title"
              />
            )}
            {lessonErrors.title && (
              <p className="text-red-500 text-xs italic">
                {lessonErrors.title}
              </p>
            )}
            {currentStep === 2 && (
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="Introduction Content"
                rows="3"
              ></textarea>
            )}
            {lessonErrors.introduction && (
              <p className="text-red-500 text-xs italic">
                {lessonErrors.introduction}
              </p>
            )}
            {currentStep === 3 && (
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={theory}
                onChange={(e) => setTheory(e.target.value)}
                placeholder="Theory Content"
                rows="3"
              ></textarea>
            )}
            {lessonErrors.theory && (
              <p className="text-red-500 text-xs italic">
                {lessonErrors.theory}
              </p>
            )}
            {currentStep === 4 && (
              <textarea
                className="w-full h-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={example}
                onChange={(e) => setExample(e.target.value)}
                placeholder="Example Content"
                rows="3"
              ></textarea>
            )}
            {lessonErrors.example && (
              <p className="text-red-500 text-xs italic">
                {lessonErrors.example}
              </p>
            )}
            {currentStep === 5 && (
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Summary Content"
                rows="3"
              ></textarea>
            )}
            {lessonErrors.summary && (
              <p className="text-red-500 text-xs italic">
                {lessonErrors.summary}
              </p>
            )}

            {/* Repeat for Theory, Example, Summary with similar structure */}
            {/* ... */}
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
              <label
                htmlFor="isFreeCheckbox"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                Make lesson Free
              </label>
            </div>
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
