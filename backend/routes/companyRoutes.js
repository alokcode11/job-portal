const express = require('express');
const { registerCompany, getCompanies, getCompanyById, updateCompany } = require('../controllers/companyController');
const isAuthenticated = require('../middleware/isAuthenticated');


const companyRouter = express.Router();

// 🚀 Notice how every single company action requires the user to be logged in!
companyRouter.post('/register', isAuthenticated, registerCompany);
companyRouter.get('/get', isAuthenticated, getCompanies);

// The ':id' syntax is how we capture the dynamic ID string straight from the URL bar!
companyRouter.get('/get/:id', isAuthenticated, getCompanyById);
companyRouter.put('/update/:id', isAuthenticated, updateCompany);

module.exports = companyRouter;
