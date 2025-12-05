import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/jobs");
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="job-list">
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job) => (
          <Link
            to={`/jobs/${job._id}`}
            key={job._id}
            className="job-preview"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <h2>{job.title}</h2>
            <p>Type: {job.type}</p>
            <p>Description: {job.description}</p>
            <p>Company: {job.company?.name || job.company}</p>
          </Link>
        ))
      )}
    </div>
  );
};

export default JobListings;
