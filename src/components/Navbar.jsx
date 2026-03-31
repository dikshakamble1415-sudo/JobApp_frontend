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
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
        if (userRole === "user") navigate("/appliedjobs");
        else alert("Admins cannot access applied jobs.");
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
        if (onSearch) onSearch({ title: "", location: "" });
    };

    return (
        <nav style={{ padding: "0.75rem 1rem", backgroundColor: "#fff", borderBottom: "2px solid #007bff", position: "sticky", top: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: "bold", fontSize: "1.3rem", color: "#007bff", cursor: "pointer" }} onClick={handleDashboard}>
                    JOBAPP
                </div>

                {isMobile && (
                    <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: "pointer", fontSize: "1.5rem" }}>
                        ☰
                    </div>
                )}

                {!isMobile && (
                    <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={searchTitle}
                            onChange={(e) => setSearchTitle(e.target.value)}
                            style={{ padding: "0.3rem", border: "1px solid #007bff", borderRadius: "4px" }}
                        />
                        <input
                            type="text"
                            placeholder="Location"
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            style={{ padding: "0.3rem", border: "1px solid #007bff", borderRadius: "4px" }}
                        />
                        <button onClick={handleSearch} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.4rem 0.7rem", borderRadius: "6px" }}>Search</button>
                        <button onClick={handleRefresh} style={{ backgroundColor: "#6c757d", color: "#fff", border: "none", padding: "0.4rem 0.7rem", borderRadius: "6px" }}>Refresh</button>
                        <button onClick={handleDashboard} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.4rem 0.7rem", borderRadius: "6px" }}>Dashboard</button>
                        <button onClick={handleAdminClick} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.4rem 0.7rem", borderRadius: "6px" }}>Admin</button>

                        {isAuthenticated && userRole === "user" && (
                            <button onClick={handleAppliedJobs} style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "0.4rem 0.7rem", borderRadius: "6px" }}>
                                Applied Jobs
                            </button>
                        )}

                        {isAuthenticated ? (
                            <button onClick={handleLogout} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.4rem 0.7rem", borderRadius: "6px" }}>
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login"><button style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.4rem 0.7rem", borderRadius: "6px" }}>Login</button></Link>
                                <Link to="/register"><button style={{ backgroundColor: "#fff", color: "#007bff", border: "1px solid #007bff", padding: "0.4rem 0.7rem", borderRadius: "6px" }}>Register</button></Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            {isMobile && menuOpen && (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.75rem" }}>
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                        style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #007bff" }}
                    />
                    <input
                        type="text"
                        placeholder="Search by location"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                        style={{ padding: "0.4rem", borderRadius: "4px", border: "1px solid #007bff" }}
                    />
                    <button onClick={handleSearch} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "6px" }}>Search</button>
                    <button onClick={handleRefresh} style={{ backgroundColor: "#6c757d", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "6px" }}>Refresh</button>
                    <button onClick={handleDashboard} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "6px" }}>Dashboard</button>
                    <button onClick={handleAdminClick} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "6px" }}>Admin</button>

                    {isAuthenticated && userRole === "user" && (
                        <button onClick={handleAppliedJobs} style={{ backgroundColor: "#28a745", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "6px" }}>
                            My Applied Jobs
                        </button>
                    )}

                    {isAuthenticated ? (
                        <button onClick={handleLogout} style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "6px" }}>Logout</button>
                    ) : (
                        <>
                            <Link to="/login"><button style={{ backgroundColor: "#007bff", color: "#fff", border: "none", padding: "0.5rem", borderRadius: "6px" }}>Login</button></Link>
                            <Link to="/register"><button style={{ backgroundColor: "#fff", color: "#007bff", border: "1px solid #007bff", padding: "0.5rem", borderRadius: "6px" }}>Register</button></Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;