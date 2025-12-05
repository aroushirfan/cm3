import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddJobPage = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  //const [contactPhone, setContactPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [salary, setSalary] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("Entry");
  const [requirements, setRequirements] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    const jobData = {
      title,
      type,
      description,
      company: {
        name: companyName,
        contactEmail,
        size: 100
      },
      location: {
        city,
        state
      },
      salary: Number(salary),
      experienceLevel,
      requirements: requirements.split(",").map((item) => item.trim())
    };

    const res = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jobData),
    });

    if (res.ok) {
      navigate("/");
    } else {
      alert("Failed to create job");
    }
  };

  return (
    <div className="create">
      <h2>Add a New Job</h2>
      <form onSubmit={submitForm}>

        <label>Job Title</label>
        <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />

        <label>Job Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Description</label>
        <textarea required value={description} onChange={(e) => setDescription(e.target.value)} />

        <label>Company Name</label>
        <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} />

        <label>Company Email</label>
        <input type="text" required value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />

        <label>City</label>
        <input type="text" required value={city} onChange={(e) => setCity(e.target.value)} />

        <label>State</label>
        <input type="text" required value={state} onChange={(e) => setState(e.target.value)} />

        <label>Salary</label>
        <input type="number" required value={salary} onChange={(e) => setSalary(e.target.value)} />

        <label>Experience Level</label>
        <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
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

        <button>Add Job</button>
      </form>
    </div>
  );
};

export default AddJobPage;
