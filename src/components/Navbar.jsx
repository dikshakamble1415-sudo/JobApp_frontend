import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ onSearch }) {
    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("");
    const [searchTitle, setSearchTitle] = useState("");
    const [searchLocation, setSearchLocation] = useState("");

    const decodeToken = (token) => {
        try {
            return JSON.parse(atob(token.split(".")[1]));
        } catch (err) {
            console.error("Invalid token", err);
            return null;
        }
    };

    useEffect(() => {
        if (token) {
            const decoded = decodeToken(token);
            if (decoded) {
                setUserName(decoded.name);
                setUserRole(decoded.role);
            }
        }
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/");
    };

    const handleAdminClick = () => {
        if (userRole === "admin") navigate("/admin");
        else alert("Access denied. Admins only.");
    };

    const handleAppliedJobs = () => {
        if (userRole === "user") {
            navigate("/appliedjobs");
        } else {
            alert("Admins cannot access applied jobs.");
        }
    };

    const handleDashboard = () => {
        navigate("/dashboard");
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch({
                title: searchTitle.toLowerCase(),
                location: searchLocation.toLowerCase(),
            });
        }
    };

    const handleRefresh = () => {
        setSearchTitle("");
        setSearchLocation("");
        if (onSearch) {
            onSearch({ title: "", location: "" });
        }
    };

    return (
        <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 2rem", backgroundColor: "#fff", borderBottom: "2px solid #007bff", position: "sticky", top: 0 }}>
            <div style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#007bff", cursor: "pointer" }} onClick={handleDashboard}>JOBAPP</div>
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                    type="text"
                    placeholder="Search by title"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    style={{ padding: "0.3rem 0.5rem", borderRadius: "4px", border: "1px solid #007bff" }}
                />
                <input
                    type="text"
                    placeholder="Search by location"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    style={{ padding: "0.3rem 0.5rem", borderRadius: "4px", border: "1px solid #007bff" }}
                />
                <button onClick={handleSearch} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "6px", cursor: "pointer" }}>Search</button>
                <button onClick={handleRefresh} style={{ backgroundColor: "#6c757d", color: "#fff", border: "none", padding: "0.4rem 0.8rem", borderRadius: "6px", cursor: "pointer" }}>Refresh</button>

                <button onClick={handleDashboard} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer" }}>Dashboard</button>
                <button onClick={handleAdminClick} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer" }}>Admin</button>

                {isAuthenticated && userRole === "user" && (
                    <button onClick={handleAppliedJobs} style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer" }}>
                        My Applied Jobs
                    </button>
                )}

                {isAuthenticated ? (
                    <button onClick={handleLogout} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer" }}>Logout</button>
                ) : (
                    <>
                        <Link to="/login"><button style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "6px" }}>Login</button></Link>
                        <Link to="/register"><button style={{ backgroundColor: "#fff", color: "#007bff", border: "1px solid #007bff", padding: "0.5rem 1rem", borderRadius: "6px" }}>Register</button></Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;