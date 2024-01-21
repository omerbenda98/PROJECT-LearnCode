import { useState } from "react";
import QuizForm from "./QuizForm";
import { GET_LESSONS } from "../queries/lessonsQueries";
import { ADD_LESSON } from "../mutations/lessonMutations";
import { useMutation } from "@apollo/client";

export default function AddLessonModal({
  onSaveLessonId,
  onSaveLesson,
  onCancel,
}) {
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [quiz, setQuiz] = useState(null);

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

  const addQuiz = (quiz) => {
    setQuiz(quiz);
  };

  const saveLesson = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    addLesson()
      .then((response) => {
        // Assuming the ID is returned under response.data.addLesson._id
        const newLessonId = response.data.addLesson.id;
        const newLesson = response.data.addLesson;

        // Call onSaveLesson with the new lesson ID
        onSaveLessonId(newLessonId);
        onSaveLesson(newLesson);
      })
      .catch((error) => {
        console.error("Error saving lesson:", error);
      });

    // Reset lesson and quiz data
    setLessonTitle("");
    setLessonContent("");
    setQuiz(null);
  };
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center h-100">
      <div className="row justify-content-center bg-secondary p-4 rounded w-100">
        <div className="col-12 col-md-8 mb-3">
          <input
            type="text"
            className="form-control mb-2"
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            placeholder="Lesson Title"
          />
        </div>
        <div className="col-12 col-md-8 ">
          <textarea
            className="form-control"
            value={lessonContent}
            onChange={(e) => setLessonContent(e.target.value)}
            placeholder="Lesson Content"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div className="row w-100 justify-content-center">
        <QuizForm onAddQuiz={addQuiz} />
        <div className="bg-secondary p-4 rounded w-100 d-flex justify-content-center">
          <button
            className="row btn btn-primary mt-3 w-25"
            onClick={saveLesson}
          >
            Save Lesson
          </button>
          <button
            className="row btn btn-secondary mt-3 w-25"
            onClick={onCancel} // Directly use the passed function here
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
