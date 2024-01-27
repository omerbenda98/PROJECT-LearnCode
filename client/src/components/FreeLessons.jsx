// FreeLessons.js
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_LESSONS } from "../queries/lessonsQueries";
import FreeLesson from "./FreeLessonCard";
import Spinner from "./Spinner";

export default function FreeLessons() {
  const { loading, error, data } = useQuery(GET_LESSONS);
  const [showFreeLessons, setShowFreeLessons] = useState(true);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong!</p>;

  const filteredLessons = data.lessons.filter(
    (lesson) => lesson.isFree === showFreeLessons
  );

  return (
    <div className="w-2/3 p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">
          {showFreeLessons ? "Free Lessons" : "Subscription Lessons"}
        </h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setShowFreeLessons(!showFreeLessons)}
        >
          {showFreeLessons ? "Show Subscription Lessons" : "Show Free Lessons"}
        </button>
      </div>
      {filteredLessons.map((lesson) => (
        <FreeLesson key={lesson.id} lesson={lesson} />
      ))}
    </div>
  );
}
