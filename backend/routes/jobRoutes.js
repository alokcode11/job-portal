const express = require('express');
const { postJob, getAllJobs, getJobById, getRecruiterJobs } = require('../controllers/jobContoller');
const isAuthenticated = require('../middleware/isAuthenticated');


const jobRouter = express.Router();
//static Route
jobRouter.post('/post', isAuthenticated, postJob);
jobRouter.get('/get', isAuthenticated, getAllJobs);
jobRouter.get('/getrecruiterJobs', isAuthenticated, getRecruiterJobs);
//Dynamic Route
jobRouter.get('/get/:id', isAuthenticated, getJobById);


module.exports = jobRouter;