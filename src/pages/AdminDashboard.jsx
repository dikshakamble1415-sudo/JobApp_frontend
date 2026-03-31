import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminDashboard() {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/job/getJobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobs();
  }, [token]);

  const createJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/job/createJob",
        { title, description, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Job created successfully");
      setTitle(""); setDescription(""); setLocation("");
      const res = await axios.get("http://localhost:8000/api/job/getJobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      alert(err.response?.data?.message || "Error creating job");
    }
  };

  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`http://localhost:8000/api/job/deleteJob/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Job deleted successfully");
      setJobs(jobs.filter((job) => job._id !== jobId));
      if (selectedJob === jobId) setApplicants([]);
    } catch (err) {
      alert(err.response?.data?.message || "Error deleting job");
    }
  };

  const viewApplicants = async (jobId) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/application/applicants/${jobId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplicants(res.data.applicants || res.data);
      setSelectedJob(jobId);
    } catch (err) {
      alert(err.response?.data?.message || "Error fetching applicants");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <h2 style={{ color: "#007bff", marginBottom: "1rem" }}>Admin Dashboard</h2>

        {/* Create Job */}
        <div style={{ border: "1px solid #007bff", borderRadius: "8px", padding: "1rem", marginBottom: "2rem" }}>
          <h3>Create Job</h3>
          <form onSubmit={createJob} style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #007bff" }} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #007bff" }} />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #007bff" }} />
            <button type="submit" style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "6px", cursor: "pointer" }}>Create Job</button>
          </form>
        </div>

        {/* Split View: Jobs + Applicants */}
        <div style={{ display: "flex", gap: "2rem" }}>
          {/* Jobs List */}
          <div style={{ flex: 1 }}>
            <h3>Jobs</h3>
            {jobs.map((job) => (
              <div key={job._id} style={{ border: "1px solid #007bff", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
                <h4>{job.title}</h4>
                <p>{job.description}</p>
                <p><b>Location:</b> {job.location}</p>
                <button onClick={() => viewApplicants(job._id)} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "6px", cursor: "pointer", marginRight: "0.5rem" }}>View Applicants</button>
                <button onClick={() => deleteJob(job._id)} style={{ backgroundColor: "#dc3545", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "6px", cursor: "pointer" }}>Delete</button>
              </div>
            ))}
          </div>

          {/* Applicants List */}
          {selectedJob && (
            <div style={{ flex: 1, border: "1px solid #007bff", borderRadius: "8px", padding: "1rem", maxHeight: "80vh", overflowY: "auto" }}>
              <h3>Applicants</h3>
              {applicants.length === 0 && <p>No applicants yet.</p>}
              {applicants.map((app) => (
                <div key={app._id} style={{ border: "1px solid #007bff", borderRadius: "8px", padding: "0.5rem", marginBottom: "0.5rem" }}>
                  <p><b>Name:</b> {app.name || app.userId.name}</p>
                  <p><b>Email:</b> {app.email || app.userId.email}</p>
                  <p><b>Location:</b> {app.location || app.userId.location || "N/A"}</p>
                  <p><b>Applied At:</b> {new Date(app.appliedAt || app.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;