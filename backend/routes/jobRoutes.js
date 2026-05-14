const express = require('express');
const { postJob, getAllJobs, getJobById, getRecruiterJobs } = require('../controllers/jobContoller');
const isAuthenticated = require('../middleware/isAuthenticated');


const jobRouter = express.Router();

jobRouter.post('/post', isAuthenticated, postJob);
jobRouter.get('/get', isAuthenticated, getAllJobs);
jobRouter.get('/get/:id', isAuthenticated, getJobById);
jobRouter.get('/getrecruiterJobs', isAuthenticated, getRecruiterJobs);

module.exports = jobRouter;