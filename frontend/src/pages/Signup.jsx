import { useState } from "react";
import axios from 'axios';
import { BASE_URL } from "../utils/constant";
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';


// state to store form input values
const Signup = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "student",
    });

    // Dynamically update state when user types in inputs 
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // Form submit handler 
    const submitHandler = async (e) => {
        e.preventDefault(); // prevent the page from the refreshing!
        try {
            // Api call to backend register route 
            const res = await axios.post(`${BASE_URL}/users/register`, input, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message || "Account Created successfully!");
                setTimeout(() => {
                    navigate("/login"); //Redirect to login page 
                }, 1500);
            }
            console.log("Response from server:", res.data);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Registration failed.");
        }
    }
    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
            <Toaster /> {/* required -> IT define where to show our popup notifications */}
            <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <h2>Create Account</h2>
                <input
                    type="text"
                    name="name"
                    value={input.name}
                    onChange={changeEventHandler}
                    placeholder="Full Name"
                    required
                    style={{ padding: "10px" }} // JS object
                />
                <input
                    type="email"
                    name="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    placeholder="Email Address"
                    required
                    style={{ padding: "10px" }}
                />
                <input
                    type="text"
                    name="phoneNumber"
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    placeholder="Phone Number"
                    required
                    style={{ padding: "10px" }}
                />
                <input
                    type="password"
                    name="password"
                    value={input.password}
                    onChange={changeEventHandler}
                    placeholder="password"
                    required
                    style={{ padding: "10px" }}
                />

                <div>
                    <label style={{ marginRight: "15px" }}>Register As: </label>
                    <label>
                        <input type="radio"
                            name="role"
                            value="student"
                            checked={input.role === "student"}
                            onChange={changeEventHandler}
                        />Student
                    </label>
                    <label style={{ marginLeft: "15px" }}>
                        <input
                            type="radio"
                            name="role"
                            value="recruiter"
                            checked={input.role === "recruiter"}
                            onChange={changeEventHandler}
                        /> Recruiter
                    </label>
                </div>
                <button type="submit" style={{padding: "12px", background: "#0070f3", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                    Sign Up
                </button>

                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </form >
        </div>
    );
};

export default Signup;