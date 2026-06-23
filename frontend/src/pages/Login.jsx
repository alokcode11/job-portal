import axios from "axios";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";



const Login = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault(); // stop the page for refreshing

        try {
            // we will call the login route
            const res = await axios.post(`${BASE_URL}/users/login`, input , {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true // Tells browser to save the jwt cookie
            });

            if(res.data.success) {
                toast.success(res.data.message || "Welcome back!");

                // Save the login state in localStorage
                localStorage.setItem("isLoggedin", "true")
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Login failed.")
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
            <Toaster />
            <form onSubmit= {submitHandler}>
                <h2>Login</h2>
                {/* Email Input  */}
                <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="Email Address"
                    required
                    style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
                />
                {/* Password Input  */}
                <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="password"
                    required
                    style={{ padding: "10px", width: "100%", marginBottom: "15px" }}
                />
                {/* Submit Button  */}
                <button type="submit" style={{ padding: "12px", background: "#0070f3", color: "white", border: "none", cursor: "pointer", fontWeight: "bold", width: "100%" }}>
                    Login
                </button>

                <p>Don't have an account? <Link to="/signup">Register here</Link></p>
            </form >
        </div>
    );
};

export default Login;