import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const authStatus = sessionStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");

    // Listen for auth changes
    const handleAuthChange = () => {
      const authStatus = sessionStorage.getItem("isAuthenticated");
      setIsAuthenticated(authStatus === "true");
    };

    window.addEventListener("authChange", handleAuthChange);

    return () => {
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

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

  const deleteJob = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${authToken}`
        }
      });

      if (res.ok) {
        alert("Job deleted successfully.");
        navigate("/");
      } else {
        throw new Error("Failed to delete job.");
      }
    } catch (err) {
      alert("Error deleting job: " + err.message);
    }
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

      {isAuthenticated && (
        <>
          <button onClick={deleteJob} style={{ marginRight: "10px" }}>
            Delete
          </button>

          <Link to={`/edit-job/${jobId}`}>
            <button>Edit</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default JobDetailsPage;