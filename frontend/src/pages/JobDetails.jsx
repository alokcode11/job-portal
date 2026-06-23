import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
import toast, { Toaster } from "react-hot-toast"; // Beautiful notifation toast create notifation and toaster screen pe render karta hai Notification 



const JobDetails = () => {
    const { id } = useParams();  // use to extract id parameter from the URL path 

    // create state to shold the job data amd track loading state 
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    // Advanced state manangement 
    const [isApplied, setIsApplied] = useState(false); // track if user is already applied or not 
    const [applying, setApplying] = useState(false); // it tells apply job wali api chal rhi hai ya complete ho chuki hai // Track button loading state during click 

    // fecth the job on component load  
    useEffect(() => {
        const fectchPageData = async () => {
            try {
                // fetch both API endpoints in parallel using promise.all 
                const [jobRes, appliedJobsRes] = await Promise.all([
                    axios.get(`${BASE_URL}/jobs/getJob-by-id/${id}`, {
                        withCredentials: true // it is crucial as backend know which user is logged in 
                    }),

                    // fetch all jobs the student has applied to.
                    // Important : if a student has applied to 0 jobs the backend return 400 error 
                    // we attach a local .catch to handle this gracefully so that it doesn't break promise.all!
                    axios.get(`${BASE_URL}/application/all-applied-jobs`, { withCredentials: true })
                        .catch(() => {
                            // Return a dummy success response so that rest of the code run fine!
                            return { data: { success: false, application: [] } };
                        })
                ]);

                //set job details
                if (jobRes.data.success) {
                    setJob(jobRes.data.job); // save the job data to state 
                }

                // check if current job is inside the list of already applied jobs
                if (appliedJobsRes.data.success) {
                    const applicationsList = appliedJobsRes.data.application || [];
                    // .some() check if atleast one item matches our condition
                    const hasApplied = applicationsList.some(app => app.job?._id === id);
                    setIsApplied(hasApplied);

                }
            } catch (error) {
                console.log("Error fetching job details", error);
                toast.error("Failed to load page information.");
            } finally {
                setLoading(false); // stop loading after request finishes (success or error )
            }
        };

        fectchPageData();
    }, [id]); // if id changes, fetch detais again!

    // Function to handle applying for a job 

    // Initally applying false hota hai 
    //  jaise hi user apply button click karta hai , ise true kar dete hai taki 
    // user multiple times click na kar sakte aur ek hi job ke liye 5 - 6 API calls ek saath backend par na aa jaye
    // Api complete hone ke baad again made it false  
    const handleApply = async () => {
        setApplying(true);
        try {
            const res = await axios.post(`${BASE_URL}/application/apply-job/${id}`, {}, {
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message || "Applied successfully!");
                setIsApplied(true); // update the state instantly in UI 
            }
        } catch (error) {
            console.log(error);
            const errorMsg = error.response?.data?.message || "Application Failed!";
            toast.error(errorMsg);

            // If they somehow managed to click it but had already applied 
            if (errorMsg.includes("already applied")) {
                setIsApplied(true);
            }
        } finally {
            setApplying(false);
        }
    };

    // render a loading indicator while fetching
    if (loading) {
        return (
            <div style={{ padding: "40px", textAlign: "center" }}>
                <h2>Loading job details...</h2>
            </div>
        );
    }

    // if fectch was done, but no job was found in the DB 
    if (!job) {
        return (
            <div>
                <h2>Job not found</h2>
                <Link to="/jobs">Back to Jobs</Link>
            </div>
        );
    };

    return (
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
            <Toaster />
            <Link to="/jobs" style={{ display: "inline-block", marginBottom: "20px", textDecoration: "none", color: "#0070f3" }}>
                ← Back to Jobs
            </Link>

            <h1 style={{ color: "#333" }}>{job.title}</h1>
            <p><strong>Location:</strong>{job.location}</p>
            <p><strong>Description:</strong>{job.description}</p>
            {/* Job Metadata Badges */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "20px 0" }}>
                <span style={{ padding: "6px 12px", background: "#e1f5fe", color: "#0288d1", borderRadius: "20px", fontSize: "14px", fontWeight: "500" }}>
                    💰{job.salary ? `${job.salary.toLocaleString()} LPA` : "N/A"}
                </span>
                <span style={{ padding: "6px 12px", background: "#ede7f6", color: "#5e35b1", borderRadius: "20px", fontSize: "14px", fontWeight: "500" }}>
                    💼 {job.jobType || "Full-Time"}
                </span>
                <span style={{ padding: "6px 12px", background: "#e8f5e9", color: "#2e7d32", borderRadius: "20px", fontSize: "14px", fontWeight: "500" }}>
                    🎓 {job.experienceLevel} {job.experienceLevel === 1 ? "year" : "years"} Exp
                </span>
                <span style={{ padding: "6px 12px", background: "#fff3e0", color: "#ef6c00", borderRadius: "20px", fontSize: "14px", fontWeight: "500" }}>
                    🔥 {job.position} Openings
                </span>
            </div>

            {/* Skills /Requirements section (Dynamics List Mapping) */}
            {job.requirement && job.requirement.length > 0 && (
                <div style={{ marginTop: "25px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
                    <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>Requirements & Skills</h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                        {job.requirement.map((skill, index) => (
                            <span
                                key={index} //Reinforching the key concept for list loops!
                                style={{
                                    padding: "6px 12px",
                                    border: "1px solid #0070f3",
                                    color: "#0070f3",
                                    borderRadius: "4px",
                                    fontSize: "14px",
                                    background: "#f0f7ff",
                                    fontWeight: "500"
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Apply Button with dynamic text, color and disabled states */}
            <button
                onClick={handleApply}
                disabled={isApplied || applying}
                style={{
                    marginTop: "20px",
                    padding: "12px 24px",
                    backgroundColor: isApplied ? "#4caf50" : "#0070f3", // Green if applied, Blue if not
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    cursor: isApplied || applying ? "not-allowed" : "pointer"
                }}
            >
                {applying ? "Applying..." : isApplied ? "Applied" : "Apply Now"}
            </button>
        </div>
    );
};

export default JobDetails; 