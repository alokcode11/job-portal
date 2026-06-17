import axios from "axios";
import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constant";


const Jobs = () => {
    // state to hold all jobs from the backend 
    const [jobs, setJobs] = useState([]);

    // state to store what the user is typing in the search box 
    const [searchText, setSearchText] = useState("");

    // fetch jobs from the backend on the page load 
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/jobs/all-jobs`, {
                    withCredentials: true
                });

                if (res.data.success) {
                    setJobs(res.data.jobs || res.data.allJobs || []);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchJobs(); // function call 
    }, []); // component load hone pe bas ek baar run karo 

    // filter the jobs array based on the searchText
    const filteredJobs = jobs.filter((job) => {
        // convert into lowercase so that search become case-insensitive
        const titleMatch = job.title?.toLowerCase().includes(searchText.toLowerCase()); // ? => tells run only when title exists 
        const locationMatch = job.location?.toLowerCase().includes(searchText.toLowerCase());
        const descmatch = job.description?.toLowerCase().includes(searchText.toLowerCase());

        // return ture if any of these match the search text
        return titleMatch || locationMatch || descmatch;
    });

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto", textAlign: "left" }}>
            <h1>All available jobs</h1>
            {/* Search input Box  */}
            <input
                type="text"
                placeholder="Filter jobs by title, location or description..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)} // update search text state as user types 
                style={{ padding: "12px", width: "100%", borderRadius: "6px", border: "1px solid #ccc", marginBottom: "20px" }}
            />

            <h2>Job List</h2>
            <div style={{ marginTop: "20px" }}>
                {/* we will write the filtering loop next! */}
                {filteredJobs.length === 0 ? (
                    <p>No jobs match your search filter.</p>
                ) : (
                    filteredJobs.map((job) => (
                        <div key={job._id} style={{ padding: "20px", border: "1px solid #eee", borderRadius: "8px", background: "#fafafa", marginBottom: "15px"}}>
                            <h3 style = {{margin: "0 0 5px 0", color: "#0070f3"}}>{job.title}</h3>
                            <p style = {{margin: "0 0 5px 0", fontSize: "14px", color: "#666"}}>{job.location}</p>
                            <p style = {{margin: "0"}}>{job.description}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Jobs;  // Client side filtering 