import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on load + on updates
  useEffect(() => {
    const auth = sessionStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(auth);

    const handleAuthChange = () => {
      setIsAuthenticated(sessionStorage.getItem("isAuthenticated") === "true");
    };

    window.addEventListener("authChange", handleAuthChange);
    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`);
        const data = await res.json();
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };

    fetchJob();
  }, [jobId]);

  // DELETE job
  const deleteJob = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Job deleted successfully");
        navigate("/");
      } else {
        throw new Error("Failed to delete job");
      }
    } catch (err) {
      alert("Error deleting job: " + err.message);
    }
  };

  if (!job) return <p>Loading...</p>;

  return (
    <div className="job-details">
      <h1>{job.title}</h1>

      <p>
        <b>Type:</b> {job.type}
      </p>
      <p>
        <b>Description:</b> {job.description}
      </p>

      <h3>Company</h3>
      <p>
        <b>Name:</b> {job.company?.name}
      </p>
      <p>
        <b>Email:</b> {job.company?.contactEmail}
      </p>
      <p>
        <b>Size:</b> {job.company?.size}
      </p>

      <h3>Location</h3>
      <p>
        {job.location?.city}, {job.location?.state}
      </p>

      <p>
        <b>Salary:</b> ${job.salary}
      </p>
      <p>
        <b>Experience:</b> {job.experienceLevel}
      </p>

      <h3>Requirements</h3>
      <ul>
        {job.requirements?.map((req, i) => (
          <li key={i}>{req}</li>
        ))}
      </ul>

      {/* Show buttons only when logged in */}
      {isAuthenticated && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={deleteJob} style={{ marginRight: "10px" }}>
            Delete
          </button>

          <Link to={`/edit-job/${jobId}`}>
            <button>Edit</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;
