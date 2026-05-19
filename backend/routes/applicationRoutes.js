const express = require('express');
const { applyJob, getAppliedJobs, getApplicants, updateStatus,  } = require('../controllers/applicationController');
const isAuthenticated = require('../middleware/isAuthenticated');


const applicationRouter = express.Router();

// 🎓 STUDENT ROUTES
// Notice we use the Job ID in the URL to apply!
applicationRouter.post('/apply-job/:id', isAuthenticated, applyJob);
applicationRouter.get('/all-applied-jobs', isAuthenticated, getAppliedJobs);

// 🎓 Recruiter ROUTES
applicationRouter.get('/:id/applicants', isAuthenticated, getApplicants);
applicationRouter.put('/status/:id/update', isAuthenticated, updateStatus);

module.exports = applicationRouter;