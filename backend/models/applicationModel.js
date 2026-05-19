const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true // The job being applied to 
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: false // Made optional so older documents don't crash when updating!
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true // The student who is applying
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'], // It can ONLY be on of these three exact words!
        default: 'pending'
    }
},{
    timestamps: true
});

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;