export default function CourseCard({ course }) {
  return (
    <div className="col-md-4 mb-4">
      {" "}
      {/* Adjust the column width as needed */}
      <div className="card h-100 shadow-sm">
        {" "}
        {/* Added shadow for depth */}
        <div className="card-body">
          <h5 className="card-title text-truncate" title={course.title}>
            {course.title}
          </h5>
          <h6 className="text-muted">Difficulty: {course.difficulty}</h6>
          <p className="card-text mt-2">{course.description}</p>
          <div className="card-text mb-2">
            <strong>Topics: </strong>
            <ul>
              {course.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
          <a
            className="btn btn-primary stretched-link"
            href={`/courses/${course.id}`}
          >
            View Lessons
          </a>
        </div>
      </div>
    </div>
  );
}
