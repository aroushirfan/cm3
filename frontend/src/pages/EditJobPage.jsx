import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [salary, setSalary] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry");
  const [requirements, setRequirements] = useState("");

  useEffect(() => {
    axios
      .get(`/api/jobs/${jobId}`)
      .then((res) => {
        const data = res.data;
        setTitle(data.title || "");
        setType(data.type || "Full-Time");
        setDescription(data.description || "");
        setCompanyName(data.companyName || "");
        setContactEmail(data.contactEmail || "");
        setContactPhone(data.contactPhone || "");
        setCity(data.location?.city || "");
        setState(data.location?.state || "");
        setSalary(data.salary || "");
        setExperienceLevel(data.experienceLevel || "Entry");
        setRequirements(data.requirements || "");
      })
      .catch((err) => console.error("Error loading job:", err));
  }, [jobId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedJob = {
      title,
      type,
      description,
      companyName,
      contactEmail,
      contactPhone,
      location: { city, state },
      salary,
      experienceLevel,
      requirements,
    };

    axios
      .put(`/api/jobs/${jobId}`, updatedJob)
      .then(() => {
        alert("Job updated successfully!");
        navigate("/");
      })
      .catch((err) => console.error("Error updating job:", err));
  };

  return (
    <div className="create">
      <h2>Edit Job</h2>

      <form onSubmit={handleSubmit}>
        <label>Job Title</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Job Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Description</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Company Name</label>
        <input
          type="text"
          required
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <label>Company Email</label>
        <input
          type="text"
          required
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
        />

        <label>Contact Phone</label>
        <input
          type="text"
          value={contactPhone}
          onChange={(e) => setContactPhone(e.target.value)}
        />

        <label>City</label>
        <input
          type="text"
          required
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <label>State</label>
        <input
          type="text"
          required
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <label>Salary</label>
        <input
          type="number"
          required
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <label>Experience Level</label>
        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
        >
          <option value="Entry">Entry</option>
          <option value="Mid">Mid</option>
          <option value="Senior">Senior</option>
        </select>

        <label>Requirements (comma separated)</label>
        <input
          type="text"
          value={requirements}
          onChange={(e) => setRequirements(e.target.value)}
          placeholder="e.g. node, react, css"
        />

        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default EditJobPage;
