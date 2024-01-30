import React, { useEffect, useState } from "react";
import CoursesPageCard from "../components/CoursesPageCard";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "../queries/courseQueries";
import Spinner from "../components/Spinner";
import SquishyCard from "../components/SquishyCard";
import { useLocation } from "react-router-dom";

const topics = ["All", "HTML", "CSS", "JavaScript", "SQL", "React", "NodeJS"]; // Include 'All' for showing all courses

export default function CoursesPage() {
  const { loading, error, data } = useQuery(GET_COURSES);
  const [selectedTopic, setSelectedTopic] = useState("All"); // State to track the selected topic
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  // Filter courses based on the selected topic
  const filteredCourses = data.courses.filter((course) => {
    const matchesTopic =
      selectedTopic === "All" || course.topic === selectedTopic;
    const matchesSearchTerm =
      searchTerm === "" ||
      course.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTopic && matchesSearchTerm;
  });
  useEffect(() => {
    // Check inside useEffect
    if (location.state?.selectedTopic) {
      setSelectedTopic(location.state.selectedTopic);
    }
  }, [location.state]);

  if (loading) return <Spinner />;
  if (error) return <p>Something Went Wrong!</p>;
  return (
    <>
      <div className="flex justify-center space-x-4 my-4">
        <input
          type="text"
          placeholder="Search by topic or description..."
          className="p-2 w-25 rounded border border-gray-300"
          onChange={handleSearchChange}
        />
        {topics.map((topic) => (
          <button
            key={topic}
            className={`py-2 px-4 rounded ${
              selectedTopic === topic ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleTopicChange(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
      {filteredCourses.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <SquishyCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <p>No Courses</p>
      )}
    </>
  );
}
