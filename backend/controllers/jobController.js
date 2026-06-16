const Job = require("../models/jobModel");

// 1. RECRUITER: POST A NEW JOB
const postJob = async (req, res) => {
    try {
        const { title, description, requirement, salary, location, jobType, experienceLevel, position, companyId } = req.body;

        if (!title || !description || !requirement || !salary || !location || !jobType || !experienceLevel || !position || !companyId) {
            return res.status(400).json({ message: "Please fill the all field", success: false });
        }

        const job = await Job.create({
            title,
            description,
            requirement: Array.isArray(requirement) ? requirement : (typeof requirement === 'string' ? requirement.split(",") : []), //convert "React,Node" -> ["React", "Node"]
            salary: Number(salary),
            location,
            jobType,
            experienceLevel,
            position,
            company: companyId,
            created_by: req.id // The Bouncer give us the logged-in Recuriter's ID
        });

        return res.status(201).json({
            message: " New job posted successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error " });
    }
}


// 2. STUDENT: GET ALL JOBS (with optional keyword search)
const getAllJobs = async (req, res) => {
    try {
        // req.query grabs data from the URL after '?' (e.g., /jobs?keyword=react)
        const keyword = req.query.keyword || "";

        // Build a smart search query using MongoDB's $or and $regex
        // This searches across title, description, AND location simultaneously!
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };

        // .populate() replaces the companyId with the actual full Company data!
        const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });

        if (!jobs) {
            return res.status(404).json({ message: " No jobs found.", success: false });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error " });
    }
}


// 3. STUDENT: GET A SINGLE JOB BY ITS ID (for the detailed job page)
const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ path: "applications" });

        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error " });
    }
}

// 4. RECRUITER: GET ALL JOBS POSTED BY THE LOGGED-IN RECRUITER
const getRecruiterJobs = async (req, res) => {
    try {
        const recruiterId = req.id;
        const jobs = await Job.find({ created_by: recruiterId }).populate({ path: "company" });

        if (!jobs) {
            return res.status(404).json({ message: " No jobs found.", success: false });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error " });
    }
}

module.exports = { postJob, getAllJobs, getJobById, getRecruiterJobs };
