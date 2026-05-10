//1. Import our user blueprint and the security tool
const user = require('../models/userModel')
const bcrypt = require('bcryptjs');

//2. Create the registration logic
const registerUser = async (req, res) => {
    try {
        //req.body contains the data typed into the frontend input by the user
        const { name, email, password, role } = req.body; // body means form 

        //step A : check if user forgot to fill out any field 
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Please fill all fields!" });
        }
        // step B : check if that email id is already registered in the DB
        const userExists = await user.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already Registered" });
        }
        //step C: Scarmble the password for the security ---> Hashing
        const hashPassword = await bcrypt.hash(password, 10);
        //step D : Now create the new user in the DB using model blueprint
        const newUser = await user.create({
            name,
            email,
            password: hashPassword,
            role
        });
        // section E: send a success msg to the frontend
        res.status(201).json({
            message: "User Registed Successfully",
            success: true,
            userCreated: newUser
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong on the server" });// internal server error only reflected on the backend 
    }
};

module.exports = { registerUser}