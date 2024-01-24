import { useState } from "react";
import AddCourseModal from "./AddCourseModal";
import AddLessonModal from "./AddLessonModal";
import QuizForm from "./QuizForm";

const ProgressForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <>
      {currentStep === 1 && <AddCourseModal />}
      {currentStep === 2 && <AddLessonModal />}
      {currentStep === 3 && <QuizForm />}
    </>
  );
};
export default ProgressForm;
