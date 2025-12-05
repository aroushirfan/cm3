import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [type, setType] = useState("Full-Time");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get(`/api/jobs/${jobId}`)
      .then((res) => {
        const data = res.data;

        setTitle(data.title);
        setType(data.type);
        setDescription(data.description);
        setCompany(data.company);
        setEmail(data.email);
        setPhone(data.phone);
      })
      .catch((err) => console.error("Error loading job:", err));
  }, [jobId]);

  const submitForm = (e) => {
    e.preventDefault();

    const updatedJob = {
      title,
      type,
      description,
      company,
      email,
      phone,
    };

    axios
      .put(`/api/jobs/${jobId}`, updatedJob)
      .then(() => {
        alert("Job updated!");
        navigate("/");
      })
      .catch((err) => console.error("Error updating job:", err));
  };

  return (
    <div className="create">
      <h2>Edit Job</h2>

      <form onSubmit={submitForm}>
        <label>Job title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Job type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Remote">Remote</option>
          <option value="Internship">Internship</option>
        </select>

        <label>Job Description:</label>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <label>Company Name:</label>
        <input
          type="text"
          required
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <label>Contact Email:</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Contact Phone:</label>
        <input
          type="text"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button>Save Changes</button>
      </form>
    </div>
  );
};

export default EditJobPage;
