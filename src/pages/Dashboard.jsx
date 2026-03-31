import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(5);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("https://jobapp-ytr3.onrender.com/api/job/getJobs", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJobs(res.data);
        setFilteredJobs(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchJobs();
  }, [token]);

  const applyJob = async (jobId) => {
    try {
      await axios.post(
        `https://jobapp-ytr3.onrender.com/api/application/apply/${jobId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Applied successfully");
    } catch (err) {
      alert(err.response?.data?.message || "Error applying");
    }
  };

  const handleSearch = ({ title, location }) => {
    const filtered = jobs.filter((job) =>
      job.title.toLowerCase().includes(title) &&
      job.location.toLowerCase().includes(location)
    );
    setFilteredJobs(filtered);
    setCurrentPage(1);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;

  const currentJobs = Array.isArray(filteredJobs)
    ? filteredJobs.slice(indexOfFirstJob, indexOfLastJob)
    : [];

  const totalPages = Math.ceil(
    (Array.isArray(filteredJobs) ? filteredJobs.length : 0) / jobsPerPage
  );

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Navbar onSearch={handleSearch} />

      <div style={{ padding: "2rem" }}>
        <h2 style={{ color: "#007bff", marginBottom: "1rem" }}>
          Available Jobs
        </h2>

        {Array.isArray(currentJobs) &&
          currentJobs.map((job) => (
            <div
              key={job._id}
              style={{
                border: "1px solid #007bff",
                borderRadius: "8px",
                padding: "1rem",
                marginBottom: "1rem",
              }}
            >
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <p>
                <b>Location:</b> {job.location}
              </p>
              <button
                onClick={() => applyJob(job._id)}
                style={{
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Apply
              </button>
            </div>
          ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #007bff",
              backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
              color: "#fff",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>

          <span style={{ alignSelf: "center", fontWeight: "bold" }}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              border: "1px solid #007bff",
              backgroundColor: currentPage === totalPages ? "#ccc" : "#007bff",
              color: "#fff",
              cursor:
                currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Dashboard;