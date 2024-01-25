import { useState } from "react";
import { FaBook } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_COURSE } from "../mutations/courseMutations";
import { GET_COURSES } from "../queries/courseQueries";
import AddLessonModal from "./AddLessonModal";
import QuizForm from "./QuizForm";
import StepIndicator from "./StepIndicator";
import { GET_LESSONS } from "../queries/lessonsQueries";
import { ADD_LESSON } from "../mutations/lessonMutations";
import { useNavigate } from "react-router-dom";
import { HiMiniXMark } from "react-icons/hi2";

export default function AddCourseModal() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [topic, setTopic] = useState("");
  const [lessonsIds, setLessonsIds] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const navigate = useNavigate();

  const [addLesson] = useMutation(ADD_LESSON, {
    variables: {
      title: lessonTitle,
      content: lessonContent,
      quiz: { questions: quiz },
    },
    update(cache, { data: { addLesson } }) {
      const data = cache.readQuery({ query: GET_LESSONS });
      if (data) {
        cache.writeQuery({
          query: GET_LESSONS,
          data: { lessons: [...data.lessons, addLesson] },
        });
      }
    },
    onError(error) {
      console.error("Error executing addLesson mutation:", error);
    },
  });

  const [addCourse] = useMutation(ADD_COURSE, {
    variables: {
      title,
      description,
      difficulty,
      topic,
      lessons: lessonsIds,
    },
    update(cache, { data: { addCourse } }) {
      const data = cache.readQuery({ query: GET_COURSES });
      if (data) {
        cache.writeQuery({
          query: GET_COURSES,
          data: { courses: [...data.courses, addCourse] },
        });
      }
    },
    onError(error) {
      console.error("Error executing addCourse mutation:", error);
    },
  });

  const saveLesson = async () => {
    const savedLessonId = [];

    try {
      const savedLesson = await addLesson({
        title: lessonTitle,
        content: lessonContent,
        quiz: { questions: quiz },
      });

      savedLessonId.push(savedLesson.data.addLesson.id);
    } catch (error) {
      console.error("Error saving lesson:", error);
    }

    return savedLessonId;
  };

  const handleCancel = () => {
    setCurrentStep(0);
  };
  const handleSavedLessons = (lesson) => {
    setLessonTitle(lesson.title);
    setLessonContent(lesson.content);
    setCurrentStep(currentStep + 1);
  };
  const goToSecondStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleOnSubmit = async (e) => {
    try {
      const lessonId = await saveLesson();
      await addCourse({
        variables: {
          title: title,
          description: description,
          difficulty: difficulty,
          topic: topic,
          lessons: lessonId,
        },
      });

      setTitle("");
      setDescription("");
      setDifficulty("Beginner");
      setTopic("");
      setLessonsIds([]);
      navigate("/");
      setCurrentStep(0);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };
  const addQuiz = (quiz) => {
    setQuiz(quiz);
  };

  return (
    <>
      <button
        type="button"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center"
        onClick={() => setCurrentStep(1)}
      >
        <FaBook className="icon mr-2" />
        <span>New Course</span>
      </button>

      {currentStep === 1 && (
        <>
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center ">
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg mx-auto w-50">
              <button onClick={() => setCurrentStep(0)}>
                <HiMiniXMark size={35} className="icon" />
              </button>
              <StepIndicator currentStep={currentStep} />

              <h5 className="text-lg font-semibold text-gray-700 mb-4">
                New Course
              </h5>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Difficulty
                  </label>
                  <select
                    id="difficulty"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Topic
                  </label>
                  <select
                    id="topic"
                    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  >
                    <option value="">Select a topic</option>
                    <option value="HTML">HTML</option>
                    <option value="CSS">CSS</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="SQL">SQL</option>
                    <option value="React">React</option>
                    <option value="Node.js">Node.js</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-900"
                    onClick={goToSecondStep}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {currentStep === 2 && (
        <>
          <AddLessonModal
            onLessonPreview={goToPreviousStep}
            onSaveLessonState={handleSavedLessons}
            currentStep={currentStep}
            onCancel={handleCancel}
            lessonTitleData={lessonTitle}
            lessonContentData={lessonContent}
          />
        </>
      )}
      {currentStep === 3 && (
        <>
          <QuizForm
            onAddQuiz={addQuiz}
            currentStep={currentStep}
            onQuizPrev={goToPreviousStep}
            onSubmit={handleOnSubmit}
            onCancel={handleCancel}
          />
        </>
      )}
    </>
  );
}
