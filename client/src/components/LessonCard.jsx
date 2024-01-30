// LessonCard.js
import { jwtDecode } from "jwt-decode";

export default function LessonCard({ lesson }) {
  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const canViewLesson =
    user && (user.role === "ADMIN" || user.role === "SUBSCRIBED");

  return (
    <div className="flex justify-between border p-4 rounded-lg shadow-lg">
      <h2 className="font-semibold text-lg">{lesson.title}</h2>
      <p>{lesson.description}</p>
      {lesson.isFree || canViewLesson ? (
        <button className="p-4 rounded border-2 border-white bg-black py-2 text-center font-mono font-black uppercase text-neutral-300 backdrop-blur transition-colors hover:bg-white/30 hover:text-white">
          View Lesson
        </button>
      ) : (
        <p>Must be subscribed to view lesson</p>
      )}
    </div>
  );
}
