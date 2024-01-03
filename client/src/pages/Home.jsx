import Courses from "../components/Courses";
import AddCourseModal from "../components/AddCourseModal";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddCourseModal />
      </div>
      <Courses />
      <hr />
    </>
  );
}
