const express = require('express');
const { registerCompany, getCompanies, getCompanyById, updateCompany } = require('../controllers/companyController');
const isAuthenticated = require('../middleware/isAuthenticated');
const singleUpload = require('../middleware/multer');

const companyRouter = express.Router();

// 🚀 Notice how every single company action requires the user to be logged in!
// /api/company ke bad agar /register likha hai to ye wala function chalo 
companyRouter.post('/register', isAuthenticated, registerCompany);
companyRouter.get('/all-companies', isAuthenticated, getCompanies);

// The ':id' syntax is how we capture the dynamic ID string straight from the URL bar!
companyRouter.get('/get-job-by-id/:id', isAuthenticated, getCompanyById); //req.params.id
companyRouter.put('/update-company/:id', isAuthenticated, updateCompany);
companyRouter.put('/update/:id', isAuthenticated, singleUpload, updateCompany);

module.exports = companyRouter;
