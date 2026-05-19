const express = require('express');
const { postJob, getAllJobs, getJobById, getRecruiterJobs } = require('../controllers/jobContoller');
const isAuthenticated = require('../middleware/isAuthenticated');


const jobRouter = express.Router();
//static Route
jobRouter.post('/create-job', isAuthenticated, postJob);
jobRouter.get('/all-jobs', isAuthenticated, getAllJobs);
jobRouter.get('/getrecruiterJobs', isAuthenticated, getRecruiterJobs);
//Dynamic Route
jobRouter.get('/getJob-by-id/:id', isAuthenticated, getJobById);


module.exports = jobRouter;