const Company = require("../models/companyModel");
const cloudinary = require("../utils/cloudinary");
const DataUri = require('datauri/parser');
const path = require('path');

//  CURD Operation 
// 1. REGISTER COMPANY LOGIC
const registerCompany = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Company name is required", success: false });
        }

        //check if a company with this name already exists 
        let company = await Company.findOne({ name });
        if (company) {
            return res.status(400).json({
                message: "You can't register the same company twice", success: false
            });
        }

        // Create the company and securely link it to the logged-in Recruiter (req.id)
        company = await Company.create({
            name,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registerd successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// 2. GET ALL COMPANIES (For the logged-in Recruiter)

const getCompanies = async (req, res) => {
    try {
        const userId = req.id;  // Get the logged-in user's ID from our Bouncer

        // Find ALL companies in the database created by this specific user
        const companies = await Company.find({ userId });
        if (!companies) {
            return res.status(400).json({ message: "No companies found.", success: false });
        }

        return res.status(200).json({
            companies,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error " });
    }
}

// 3. GET A SINGLE COMPANY BY ITS ID
const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id // pull the ID directly out of the URL bar!
        const company = await Company.findById(companyId);

        if (!company) {
            return res.status(400).json({ message: "Company not found.", success: false });
        }

        return res.status(200).json({
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error " });
    }
}

// 4. UPDATE COMPANY DETAILS
const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        const updateData = { name, description, website, location };

        // --- 🚀 COMPANY LOGO UPLOAD ---
        if(req.file) {
            const parser = new DataUri();
            const fileExtension = path.extname(req.file.originalname).toString();
            const fileDataUri = parser.format(fileExtension, req.file.buffer);
            const cloudinaryResponse = await cloudinary.uploader.upload(fileDataUri.content);
            updateData.logo = cloudinaryResponse.secure_url; // save the logo URL 
        }

        // Find the company by URL ID and update it. { new: true } returns the updated data!
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({ message: "Company not found.", success: false });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { registerCompany, getCompanies, getCompanyById, updateCompany }; 