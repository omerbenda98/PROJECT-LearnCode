import { motion } from "framer-motion";
import CrudDropdown from "./CrudDropdown";
import { Link } from "react-router-dom";

const SquishyCard = (course) => {
  return (
    <section className=" px-4 py-12 z-0">
      <div>
        <Card course={course.course} />
      </div>
    </section>
  );
};

const Card = (course) => {
  console.log(course.course.id);
  return (
    <motion.div
      whileHover="hover"
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
      variants={{
        hover: {
          scale: 1.05,
        },
      }}
      className="relative h-96 w-96 shrink-0 overflow-hidden rounded-xl bg-indigo-900 p-8"
    >
      <div className="relative z-0 text-white">
        <span className="mb-3 block w-fit rounded-full bg-white/30 px-3 py-0.7 text-lg font-light text-white">
          {course.course.title}
        </span>

        <span className="mb-3 block w-fit rounded-full bg-black/30 px-3 py-0.5 text-sm font-light text-white">
          {course.course.difficulty}
        </span>
        <span className="mb-3 block w-fit text-md ">
          {" "}
          {course.course.description}
        </span>
        <span className="mb-3 block w-fit text-md ">
          {" "}
          Topic: {course.course.topic}
        </span>
      </div>

      <Link
        to={`courses/${course.course.id}`}
        className="absolute bottom-4 left-4 right-4 z-0 rounded border-2 border-white bg-black py-2 text-center font-mono font-black uppercase text-neutral-300 backdrop-blur transition-colors hover:bg-white/30 hover:text-white"
      >
        Get Course Now
      </Link>

      <Background courseData={course.course} />
      <CrudDropdown courseId={course.course.id} />
    </motion.div>
  );
};

const Background = (courseData) => {
  return (
    <motion.svg
      width="380"
      height="390"
      viewBox="0 0 320 374"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-[-1]"
      variants={{
        hover: {
          scale: 1.1,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill=""
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="131.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};

export default SquishyCard;
