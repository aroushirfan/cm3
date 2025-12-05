import { Link } from "react-router-dom";

const JobListing = ({ job }) => {
  return (
    <Link
      to={`/jobs/${job._id}`}
      className="job-preview"
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <h2>{job.title}</h2>
      <p>Type: {job.type}</p>
      <p>Description: {job.description}</p>
      <p>Company: {job.company?.name || job.company}</p>
    </Link>
  );
};

export default JobListing;
