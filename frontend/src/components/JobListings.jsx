import { useEffect, useState } from "react";

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
          <div key={job.id} className="job-preview">
            <h2>{job.title}</h2>
            <p>Type: {job.type}</p>
            <p>Description: {job.description}</p>
            <p>Company: {job.company?.name}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default JobListings;
