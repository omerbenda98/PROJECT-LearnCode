// FreeLesson.js
export default function FreeLessonCard({ lesson }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <h2 className="font-semibold text-lg">{lesson.title}</h2>
      <p>{lesson.description}</p>
      {/* Add more lesson details here */}
    </div>
  );
}
