const Application = require("../models/applicationModel");
const Job = require("../models/jobModel");

// 1. STUDENT: APPLY FOR A JOB
const applyJob = async (req, res) => {
    try {
        const userId = req.id; // Logged-in student ID
        const jobId = req.params.id; // Job ID from the URL

        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required ", success: false });
        }

        //  Prevent spam: Check if the student already applied to this exact job 
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job.", success: false });
        }

        // Check if the job actually exists in the database
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({ message: "Job not found", success: false });
        }

        // create the brand new application!.
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
            company: job.company
        });

        // 🚀 CRITICAL LINK: Push this application's ID into the Job's 'applications' array!
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 2. STUDENT: GET ALL JOBS THEY APPLIED FOR
const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;

        // 🧠 Advanced Concept: Nested (Deep) Population!
        // Find the application -> expand the 'job' -> inside the job, expand the 'company'
        const application = await Application.find({ applicant: userId })
        .sort({ createdAt: -1 })
        .populate('job', 'title')
        .populate('company');

        if(!application) {
            return res.status(400).json({ message: "No applications found ", success: false });
        }

        return res.status(200).json({
            application,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal sever error " });
    }
}

// 3. RECRUITER: GET ALL STUDENTS WHO APPLIED TO A SPECIFIC JOB
const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id; // The Recruiter click on a specific job

        // Find the job -> expand the 'application' array -> inside each application, expand the 'applicant'(Student profile)!
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: {sort: { createdAt: -1 }},
            populate: {
                path: 'applicant'
            }
        });

        if(!job) {
            return res.status(400).json({ message: "Job not found.", success: false });
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

// 4. RECRUITER: UPDATE THE STATUS (Accept/Reject)
const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id; //URL contains the specific Application ID

        if(!status) {
            return res.status(400).json({ message: "status is required", success: false });
        }

        //Find the applicant
        const application = await Application.findById(applicationId);
        if(!application) {
            return res.status(400).json({ message: "Application not found", success: false });
        }

        // update the status( IT must match one of our Enums: pending, accepted, rejected)
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "status updated successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error " });
    }
}

module.exports = { applyJob, getAppliedJobs, getApplicants, updateStatus };