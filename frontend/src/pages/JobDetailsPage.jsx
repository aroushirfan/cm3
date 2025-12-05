import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/jobs/${jobId}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };

    fetchJob();
  }, [jobId]);

  // ❌ Delete disabled — does nothing
  const deleteJob = () => {
    alert("Delete feature is not available.");
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-details">
      <h1>{job.title}</h1>
      <p><b>Type:</b> {job.type}</p>
      <p><b>Description:</b> {job.description}</p>

      <h3>Company</h3>
      <p>Name: {job.company?.name}</p>
      <p>Email: {job.company?.contactEmail}</p>
      <p>Size: {job.company?.size}</p>

      <h3>Location</h3>
      <p>{job.location?.city}, {job.location?.state}</p>

      <p><b>Salary:</b> ${job.salary}</p>
      <p><b>Experience:</b> {job.experienceLevel}</p>

      <h3>Requirements</h3>
      <ul>
        {job.requirements?.map((req, i) => (
          <li key={i}>{req}</li>
        ))}
      </ul>

      <button onClick={deleteJob} style={{ marginRight: "10px" }}>
        Delete
      </button>

      <Link to={`/edit-job/${jobId}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default JobDetailsPage;
