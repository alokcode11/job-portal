const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,    // first letter is always capital in the mongoose schema 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String, // Job seekers and recruiters need phone numbers!
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    // We add a structured profile object to hold extra optional details
    profile: {
        bio: { type: String },
        skills: [{ type: String }], // Array of strings (e.g., ["React", "NodeJS"])
        resume: { type: String }, // URL to resume file
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }, // For recruiters later!
        profilePhoto: { type: String, default: "" }
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;