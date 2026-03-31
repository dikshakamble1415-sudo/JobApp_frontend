import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/Api";

function Logout() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    await API.post(
                        "https://jobapp-ytr3.onrender.com/api/user/logout",
                        {},
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                }

                // Remove token from localStorage
                localStorage.removeItem("token");
                setMessage("You have logged out successfully.");

                // Redirect to login/dashboard after 2 seconds
                setTimeout(() => {
                    navigate("/"); // or "/login"
                }, 2000);
            } catch (error) {
                console.error(error);
                setMessage("Error logging out. Please try again.");
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <div className="container col-md-4 mt-5">
            <div className="card p-4 shadow text-center">
                <h4>Logout</h4>
                {message && <p className="text-danger mt-3">{message}</p>}
            </div>
        </div>
    );
}

export default Logout;