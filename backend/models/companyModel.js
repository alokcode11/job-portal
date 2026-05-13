const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // No two companies can have the exact same name
        unique: true
    },
    description: {
        type: String,
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    logo: {
        type: String // URL to the company's logo image
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Connects this company to the specific Recruiter who created it
        required: true
    }
}, {
    timestamps: true
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;