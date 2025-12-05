import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  if (!job) {
    console.warn("JobListing received undefined job.");
    return null;
  }

  const jobId = job.id || job._id;

  if (!jobId) {
    console.warn("JobListing: job has no id:", job);
    return null;
  }

  return (
    <Link
      to={`/jobs/${jobId}`}
      className="job-preview"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <h2>{job.title || "No Title"}</h2>
      <p>Type: {job.type || "Unknown"}</p>
      <p>Company: {job.company?.name || "Unknown"}</p>
    </Link>
  );
};

export default JobListing;
