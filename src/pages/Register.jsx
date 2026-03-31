import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Navbar from "../components/Navbar"

function Register() {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")
    const [message, setMessage] = useState("")

    const register = async (e) => {

        e.preventDefault()


        try {

            const res = await axios.post("https://jobapp-ytr3.onrender.com/api/user/register",
                { name, email, password, role }
            )

            alert("Registration successful")

            setMessage(res.data.message)

            // clear form fields
            setName("")
            setEmail("")
            setPassword("")
            setRole("")


            navigate('/login')



        } catch (error) {

            if (error.response && error.response.data.message) {
                setMessage(error.response.data.message)
            } else {
                setMessage("Something went wrong")
            }

        }

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
                        Register
                    </h3>

                    {message && (
                        <p style={{ textAlign: "center", color: "red", marginBottom: "1rem" }}>
                            {message}
                        </p>
                    )}

                    <form onSubmit={register} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{
                                padding: "0.75rem",
                                borderRadius: "6px",
                                border: "1px solid #007bff",
                                fontSize: "1rem",
                            }}
                        />

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

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                            style={{
                                padding: "0.75rem",
                                borderRadius: "6px",
                                border: "1px solid #007bff",
                                fontSize: "1rem",
                                backgroundColor: "#ffffff",
                            }}
                        >
                            <option value="">Select Role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>



                        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: "#007bff",
                                    color: "#ffffff",
                                    border: "none",
                                    borderRadius: "6px",
                                    padding: "0.75rem",
                                    fontWeight: "900",
                                    cursor: "pointer",
                                    width: "100%",
                                    fontSize: "0.8rem"
                                }}
                            >
                                Submit
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                style={{
                                    backgroundColor: "#ffffff",
                                    color: "#007bff",
                                    border: "1px solid #007bff",
                                    borderRadius: "6px",
                                    padding: "0.75rem",
                                    fontWeight: "900",
                                    cursor: "pointer",
                                    width: "100%",
                                    fontSize: "0.8rem"
                                }}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )

}

export default Register