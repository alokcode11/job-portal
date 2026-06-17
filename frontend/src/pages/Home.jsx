import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constant";



const Home = () => {
    // create to hold the list of jobs where jobs store data and setJobs used to update the data 
    const [jobs, setJobs] = useState([]);

    // Component load hone pe code chalane ke liye 
    useEffect(() => {
        // Creatating a function to fetch jobs
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/jobs/all-jobs`, {
                    withCredentials: true
                });

                if (res.data.success) {
                    // save the list of jobs into our React state 
                    setJobs(res.data.jobs || res.data.allJobs || []);
                }
            } catch (error) {
                console.log("Error fectching jobs:", error);
            }
        };

        // call the function 
        fetchJobs();
    }, []); // component load hone par sirf ek bar run karo  
    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
            <h1>Find your dream job</h1>

            {/* Simple search input  */}
            <div style={{ marginBottom: "30px", display: "flex", gap: "10px" }}>
                <input
                    type="text"
                    placeholder="Search jobs by keyword..."
                    style={{ padding: "10px", width: "100%", borderRadius: "4px", border: "1px solid #ccc" }}
                />
                <button style={{ padding: "10px 20px", background: "#0070f3", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}>
                    Search
                </button>
            </div>

            <h2>Latest Jobs</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
                {/* jobs array par loop lagao and render karo one by one  */}
                {jobs.length === 0 ? (
                    <p>No job found. Try posting a job First!</p>
                ) : (
                    jobs.map((job) => (
                        <div key={job._id} style={{ padding: "20px", border: "1px solid #eee", borderRadius: "8px", background: "#fafafa" }}>
                            <h3 style={{ margin: " 0 0 5px 0", color: "#0070f3" }}>{job.title}</h3>
                            <p style={{ margin: " 0 0 5px 0", fontSize: "14px", color: "#666" }}>Location: {job.location}</p>
                            <p style={{margin: "0"}}>{job.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Home;