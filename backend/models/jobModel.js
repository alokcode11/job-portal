const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirement: [{
        type: String // Array of strings (e.g., ["React", "NodeJS"])
    }],
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true // e.g., "Full-time", "Part-time", "Internship"
    },
    experienceLevel: {
        type: Number, // Years of experience required (e.g., 2)
        required: true
    },
    position: {
        type: Number,
        required: true // Number of vacancies available
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',  // Connects this job to a specific Company blueprint
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Connects this job to the Recruiter who posted it
        required: true
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Application' // Keeps track of all students who apply to this job
    }],
}, {
    timestamps: true
});

// --- 🚀 RESUME OPTIMIZATION: COMPOUND INDEXING ---
// We index location and jobType together (1 means ascending order).
// This achieves your exact resume goal of reducing API search response times!
jobSchema.index({ location: 1, jobType: 1 });

const Job = mongoose.model('Job', jobSchema); //Doubt

module.exports = Job;
