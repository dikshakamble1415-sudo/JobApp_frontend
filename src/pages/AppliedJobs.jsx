import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AppliedJobs() {
    const [jobs, setJobs] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const res = await axios.get("https://jobapp-ytr3.onrender.com/api/application/getuserapplicants", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setJobs(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchAppliedJobs();
    }, [token]);

    return (
        <>
            <Navbar />
            <div style={{ padding: "2rem" }}>
                <h2 style={{ color: "#007bff", marginBottom: "1rem" }}>My Applied Jobs</h2>
                {jobs.length === 0 ? (
                    <p>No applied jobs yet.</p>
                ) : (
                    jobs.map((app) => app.jobId && (
                        <div key={app._id} style={{ border: "1px solid #007bff", borderRadius: "8px", padding: "1rem", marginBottom: "1rem" }}>
                            <h4>{app.jobId.title}</h4>
                            <p>{app.jobId.description}</p>
                            <p><b>Location:</b> {app.jobId.location}</p>

                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default AppliedJobs;