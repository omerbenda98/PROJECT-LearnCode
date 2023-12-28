// import Clients from "../components/Clients";
import Courses from "../components/Courses";
import AddClientModal from "../components/AddCourseModal";
import AddLessonModal from "../components/AddLessonModal";

export default function Home() {
  return (
    <>
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddLessonModal />
      </div>
      <Courses />
      <hr />
      {/* <Clients /> */}
    </>
  );
}
