import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";
import Navbar from "../components/Navbar";



function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async (e) => {
        e.preventDefault()

        const res = await axios.post("http://localhost:8000/api/user/login", { email, password })
        alert("Login Successful")

        localStorage.setItem("token", res.data.token)

        navigate("/dashboard")


    }

    return (
        <>
            <Navbar />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "80vh",
                    padding: "1rem",
                    backgroundColor: "#ffffff",
                }}
            >
                <div
                    style={{
                        width: "100%",
                        maxWidth: "400px",
                        borderRadius: "12px",
                        border: "1px solid #007bff",
                        boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
                        padding: "2rem",
                    }}
                >
                    <h3
                        style={{
                            textAlign: "center",
                            marginBottom: "1.5rem",
                            color: "#007bff",
                            letterSpacing: "0.5px",
                        }}
                    >
                        Member Login
                    </h3>

                    <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                padding: "0.75rem",
                                borderRadius: "6px",
                                border: "1px solid #007bff",
                                fontSize: "1rem",
                            }}
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                padding: "0.75rem",
                                borderRadius: "6px",
                                border: "1px solid #007bff",
                                fontSize: "1rem",
                            }}
                        />

                        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "0.75rem",
                                    fontWeight: "800",
                                    cursor: "pointer",
                                    width: "100%",
                                    fontSize: "0.8rem"
                                }}
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/register")}
                                style={{
                                    backgroundColor: "#ffffff",
                                    color: "#007bff",
                                    border: "1px solid #007bff",
                                    borderRadius: "6px",
                                    padding: "0.75rem",
                                    fontWeight: "800",
                                    cursor: "pointer",
                                    width: "100%",
                                    fontSize: "0.8rem"
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )

}

export default Login