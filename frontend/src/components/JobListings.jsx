import { useEffect, useState } from "react";
import JobListing from "./JobListing";

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

  if (!jobs || jobs.length === 0) {
    return <p>No jobs available</p>;
  }

  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobListing key={job.id || job._id} job={job} />
      ))}
    </div>
  );
};

export default JobListings;
